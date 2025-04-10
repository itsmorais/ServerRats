import express from 'express'
import cors from 'cors'
import { routes } from './http/routes/index.routes';
import { logRequests } from './http/middlewares/logRequests';

export const app = express();
app.use(cors())
app.use(express.json());
app.use(logRequests);
app.use("/api",routes)