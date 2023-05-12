import express, {Express, json, Request, Response} from 'express';
import cors from 'cors';
import {authHandler} from './auth.js';
import {ProxiesRoutes} from './routes.js';
import {config} from "./config.js";

const app: Express = express();

app.use(cors({
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
