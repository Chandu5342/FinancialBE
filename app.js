import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use(errorHandler);


export default app;