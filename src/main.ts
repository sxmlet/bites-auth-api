import express, {Express, json} from 'express';
import cors from 'cors';
import {authHandler} from './auth.js';
import {ProxiesRoutes} from './routes.js';
import {config} from "./config.js";

const app: Express = express();

app.use(cors({
  allowedHeaders: '*',
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  preflightContinue: true,
  origin: '*',
}));

app.use(json());
app.use(authHandler);
app.use('/api/v0', ProxiesRoutes)

app.listen(config.appPort, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${config.appPort}`);
});
