import express from 'express';

// controllers
import * as TransactionsController from './transactions.controller.js';

// middleware
import { validateAccessToken } from '../middleware/auth0.middleware.js';

const transactionsRouter = express.Router();

transactionsRouter.get('/', validateAccessToken, TransactionsController.getTransactions);
transactionsRouter.get('/total-amount-per-year/:type', validateAccessToken, TransactionsController.getTransactionsByTotalAmountPerYear);
transactionsRouter.get('/total-amount-per-month/:year/:type', validateAccessToken, TransactionsController.getTransactionsByTotalAmountPerMonth);
transactionsRouter.get('/total-amount-per-day/:year/:month/:type', validateAccessToken, TransactionsController.getTransactionsByTotalAmountPerDay);
transactionsRouter.get('/:id', validateAccessToken, TransactionsController.getTransaction);
transactionsRouter.post('/', validateAccessToken, TransactionsController.addTransaction);
transactionsRouter.put('/:id', validateAccessToken, TransactionsController.updateTransaction);
transactionsRouter.delete('/:id', validateAccessToken, TransactionsController.removeTransaction);
transactionsRouter.all('*', TransactionsController.notFound);

export {
  transactionsRouter
};
