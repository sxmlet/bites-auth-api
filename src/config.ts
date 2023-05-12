import { config as loadDotenv } from 'dotenv';

loadDotenv();

type AuthConfig = {
  appPort: string;
  // Json Web Key Set url.
  jwksUrl: string;
  bitesApi: string;
}

export const config: AuthConfig = {
  appPort: process.env.PORT ?? '3001',
  jwksUrl: process.env.JWKS_URL ?? '',
  bitesApi: process.env.BITES_API ?? '',
}
