import express from 'express';

// controllers
import * as TransactionsController from './transactions.controller.js';

// middleware
import { validateAccessToken } from '../middleware/auth0.middleware.js';

const transactionsRouter = express.Router();

transactionsRouter.get('/', validateAccessToken, TransactionsController.getTransactions);
transactionsRouter.get('/:id', validateAccessToken, TransactionsController.getTransaction);
transactionsRouter.post('/', validateAccessToken, TransactionsController.addTransaction);
transactionsRouter.put('/:id', validateAccessToken, TransactionsController.updateTransaction);
transactionsRouter.delete('/:id', validateAccessToken, TransactionsController.removeTransaction);
transactionsRouter.all('*', TransactionsController.notFound);

export {
  transactionsRouter
};
