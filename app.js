import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});
app.use('/api/auth', authRoutes);




export default app;