import { Transaction, Category } from '../models/index.js';
import { Sequelize } from 'sequelize';


//  Dashboard Summary
export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    // total income
    const totalIncome = await Transaction.sum('amount', {
      where: { userId, type: 'income' },
    });

    // total expense
    const totalExpense = await Transaction.sum('amount', {
      where: { userId, type: 'expense' },
    });

    // category-wise totals
    const categoryTotals = await Transaction.findAll({
      attributes: [
        'categoryId',
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'total'],
      ],
      where: { userId },
      include: [{ model: Category, attributes: ['name'] }],
      group: ['categoryId', 'Category.id'],
    });

    // recent transactions
    const recentTransactions = await Transaction.findAll({
      where: { userId },
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [{ model: Category }],
    });

    res.json({
      totalIncome: totalIncome || 0,
      totalExpense: totalExpense || 0,
      netBalance: (totalIncome || 0) - (totalExpense || 0),
      categoryTotals,
      recentTransactions,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


export const getMonthlyTrends = async (req, res) => {
  try {
    const userId = req.user.id;

    const trends = await Transaction.findAll({
      attributes: [
        [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('date')), 'month'],
        'type',
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'total'],
      ],
      where: { userId },
      group: ['month', 'type'],
      order: [['month', 'ASC']],
    });

    res.json({ trends });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};