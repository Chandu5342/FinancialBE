import { Category } from '../models/index.js';

export const createCategory = async (req, res) => {
  try {
    const { name, type } = req.body;

    const existing = await Category.findOne({ where: { name } });
    if (existing) {
      return res.status(400).json({ message: 'category already there' });
    }

    const category = await Category.create({ name, type });

    res.status(201).json({
      message: 'category created successfully',
      data: category,
    });
  } catch (error) {
    res.status(500).json({ message: 'server error' });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();

    res.json({
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ message: 'server error' });
  }
};