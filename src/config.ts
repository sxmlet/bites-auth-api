import { config as loadDotenv } from 'dotenv';

loadDotenv();

type AuthConfig = {
  appPort: string;
  // Json Web Key Set url.
  jwksUrl: string;
  bitesApi: string;
}

export const config: AuthConfig = {
  appPort: process.env.PORT ?? '8080',
  jwksUrl: process.env.JWKS_URL ?? '',
  bitesApi: process.env.BITES_API ?? '',
}
