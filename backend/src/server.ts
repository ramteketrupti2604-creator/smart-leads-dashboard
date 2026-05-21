import dotenv from 'dotenv';
dotenv.config();

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import leadRoutes from './routes/leadRoutes';

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Database Connection
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Base Route
app.get('/', (req: Request, res: Response) => {
  res.send('🚀 GigFlow Dashboard API is running perfectly...');
});

app.listen(PORT, () => {
  console.log(`⚡ Server is sprinting on http://localhost:${PORT}`);
});