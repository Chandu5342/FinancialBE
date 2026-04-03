import express from 'express';
import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction
} from '../controllers/transactionController.js';

import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { validate } from '../middleware/validate.js';
import {
  createTransactionSchema,
  updateTransactionSchema
} from '../validations/transactionValidation.js';

const router = express.Router();

// create → analyst & admin
router.post(
  '/',
  protect,
  authorizeRoles('analyst', 'admin'),
  validate(createTransactionSchema),
  createTransaction
);

// get → all users
router.get('/', protect, getTransactions);

// update → analyst & admin
router.put(
  '/:id',
  protect,
  authorizeRoles('analyst', 'admin'),
  validate(updateTransactionSchema),
  updateTransaction
);

// delete → admin only
router.delete(
  '/:id',
  protect,
  authorizeRoles('admin'),
  deleteTransaction
);

export default router;