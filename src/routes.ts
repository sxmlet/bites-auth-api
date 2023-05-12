import {Router, Request, Response} from 'express';
import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {createLogger} from "./common/logger.js";
import {config} from "./config.js";
import {toJsonString} from "./common/utils.js";

const logger = createLogger('auth-proxy');
const router = Router();

async function genericHandler(req: Request, resp: Response) {
  logger.info(`incoming request - method: ${req.method}, path: ${req.path}`)
  if (req.method.toLowerCase() === 'options') {
    return resp.send();
  }

  const conf: AxiosRequestConfig = {
    headers: {
      Authorization: req.headers.authorization,
      'Content-Type': 'application/json',
    },
    url: config.bitesApi + req.path,
    method: req.method,
  }
  if (req.body) {
    conf.data = JSON.stringify(req.body);
  }

  try {
    const res = await axios.request(conf);
    return resp.send(res.data);
  } catch (e) {
    let err = e as unknown as AxiosError;
    let status = 500;
    if (err.response) {
      status = err.response.status;
    }
    return resp.status(status).send(toJsonString({message: err.message}));
  }
}


router.all('/bites', genericHandler);
router.all('/bites/*', genericHandler);
router.all('/:uid/bites', genericHandler);

export const ProxiesRoutes: Router = router;
