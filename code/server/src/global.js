import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '../prisma/client/index.js';
import userRouter from './routers/user-router.js';
import authRouter from './routers/auth-router.js';
import guidelineRouter from './routers/guideline-router.js';

dotenv.config();

export const app = express();
export const prisma = new PrismaClient();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (_, res) => {
  res.status(200).json({ data: 'API is ready to use!' });
});

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/guidelines', guidelineRouter);

app.use('/*', (req, res) => {
  res.status(404).json({ err: 'Route not found.' });
});
