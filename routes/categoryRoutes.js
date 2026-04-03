import express from 'express';
import { createCategory, getCategories } from '../controllers/categoryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { validate } from '../middleware/validate.js';
import { createCategorySchema } from '../validations/categoryValidation.js';

const router = express.Router();

// Admin only
router.post(
  '/',
  protect,
  authorizeRoles('admin'),
  validate(createCategorySchema),
  createCategory
);

// All logged-in users can view
router.get('/', protect, getCategories);

export default router;