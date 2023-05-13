import express, {Express, json, Request, Response} from 'express';
import cors from 'cors';
import {authHandler} from './auth.js';
import {ProxiesRoutes} from './routes.js';
import {config} from "./config.js";
import {toJsonString} from "./common/utils.js";

const app: Express = express();

app.use(cors({
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  preflightContinue: true,
  origin: '*',
}));

app.use(json());

app.get('/version', (req: Request, res: Response) => {
  res.send(toJsonString({version: process.env.VERSION ?? ''}))
});

app.use(authHandler);
app.use('/api/v0', ProxiesRoutes)

app.listen(config.appPort, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${config.appPort}`);
  console.log(`Configured bitBites bites API URL: ${config.bitesApi}`);
});
