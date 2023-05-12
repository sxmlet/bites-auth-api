import jwtpkg from 'jsonwebtoken';
import axios, {AxiosError} from 'axios';
import {NextFunction, Request, Response} from 'express';
import { createLogger } from './common/logger.js'
import { Jwt } from './model/Jwt.js'
import { JwtPayload } from './model/JwtPayload.js';
import { JsonWebKey } from './model/JsonWebKey.js';
import {config} from './config.js';

const logger = createLogger('auth')
const jwksUrl = config.jwksUrl;

export const authHandler = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  logger.info('Authorizing a user')
  try {
    const jwtToken = await verifyToken(req.headers.authorization as string)
    logger.info('User was authorized', jwtToken)

    return next()
  } catch (e) {
    let err = e as unknown as AxiosError;
    logger.error('User not authorized: ' + err.message)

    return res.status(403).send(JSON.stringify({
      message: 'access denied'
    }))
  }
}

async function verifyToken(authHeader: string): Promise<JwtPayload> {
  const token = getToken(authHeader);
  const jwt: Jwt = jwtpkg.decode(token, { complete: true }) as unknown as Jwt;
  const keys = await getKeys();
  const key = keys.filter(k => {
    return k.kid === jwt.header.kid;
  });
  const cert = '-----BEGIN CERTIFICATE-----\n' + key[0]['x5c'][0] + '\n-----END CERTIFICATE-----';
  return jwtpkg.verify(token, cert, { algorithms: ['RS256'] }) as unknown as JwtPayload;
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  return split[1]
}

async function getKeys(): Promise<JsonWebKey[]>{
  const resp = await axios.get(jwksUrl);
  return resp.data.keys;
}
