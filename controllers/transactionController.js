import { Transaction, Category } from '../models/index.js';
import { Op } from 'sequelize';


// CREATE
export const createTransaction = async (req, res) => {
  try {
    const { amount, type, categoryId, date, notes } = req.body;

    // check category exists
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    const transaction = await Transaction.create({
      amount,
      type,
      categoryId,
      userId: req.user.id,
      date,
      notes,
    });

    res.status(201).json({
      message: 'Transaction created',
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


// GET ( filtering + pagination)
export const getTransactions = async (req, res) => {
  try {
    const { type, categoryId, startDate, endDate, page = 1, limit = 5 } = req.query;

    const where = {};

    // filter by user (important)
    where.userId = req.user.id;

    if (type) where.type = type;
    if (categoryId) where.categoryId = categoryId;

    if (startDate && endDate) {
      where.date = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }

    const offset = (page - 1) * limit;

    const { rows, count } = await Transaction.findAndCountAll({
      where,
      include: [{ model: Category }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['date', 'DESC']],
    });

    res.json({
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
      data: rows,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


//  UPDATE
export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    await transaction.update(req.body);

    res.json({
      message: 'Transaction updated',
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


//  DELETE
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    await transaction.destroy();

    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};