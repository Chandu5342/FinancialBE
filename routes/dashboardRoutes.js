import express from 'express';
import {
  getDashboardSummary,
  getMonthlyTrends
} from '../controllers/dashboardController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/summary', protect, getDashboardSummary);
router.get('/trends', protect, getMonthlyTrends);

export default router;