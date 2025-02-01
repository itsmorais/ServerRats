import express from 'express'
import cors from 'cors'
import { routes } from './http/routes/index.routes';

export const app = express();
app.use(cors())
app.use(express.json());
app.use(routes)