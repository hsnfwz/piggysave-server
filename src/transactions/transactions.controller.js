import * as TransactionsService from './transactions.service.js';

const getTransactions = async(req, res) => {
  const userId = req.auth.payload.sub;
  const data = await TransactionsService.getTransactions(userId);
  res.status(200).json(data);
};

const getTransaction = async (req, res) => {
  const userId = req.auth.payload.sub;
  const transactionId = req.params.id;
  const data = await TransactionsService.getTransaction(userId, transactionId);
  res.status(200).json(data);
};

const getTransactionsByTotalAmountPerYear = async (req, res) => {
  const userId = req.auth.payload.sub;
  const type = req.params.type;
  const data = await TransactionsService.getTransactionsByTotalAmountPerYear(userId, type);
  res.status(200).json(data);
}

const getTransactionsByTotalAmountPerMonth = async (req, res) => {
  const userId = req.auth.payload.sub;
  const year = req.params.year;
  const type = req.params.type;
  const data = await TransactionsService.getTransactionsByTotalAmountPerMonth(userId, year, type);
  res.status(200).json(data);
}

const getTransactionsByTotalAmountPerDay = async (req, res) => {
  const userId = req.auth.payload.sub;
  const year = req.params.year;
  const month = req.params.month;
  const type = req.params.type;
  const data = await TransactionsService.getTransactionsByTotalAmountPerDay(userId, year, month, type);
  res.status(200).json(data);
}

const addTransaction = async (req, res) => {
  const userId = req.auth.payload.sub;
  const body = req.body;
  const data = await TransactionsService.addTransaction(userId, body);
  res.status(201).json(data);
};

const updateTransaction = async (req, res) => {
  const userId = req.auth.payload.sub;
  const transactionId = req.params.id;
  const body = req.body;
  const data = await TransactionsService.updateTransaction(userId, transactionId, body);
  res.status(200).json(data);
};

const removeTransaction = async (req, res) => {
  const userId = req.auth.payload.sub;
  const transactionId = req.params.id;
  const data = await TransactionsService.removeTransaction(userId, transactionId);
  res.status(200).json(data);
};

const notFound = (req, res) => {
  res.status(404).json({ message: 'Resource not found' });
}

export {
  getTransactions,
  getTransaction,
  getTransactionsByTotalAmountPerYear,
  getTransactionsByTotalAmountPerMonth,
  getTransactionsByTotalAmountPerDay,
  addTransaction,
  updateTransaction,
  removeTransaction,
  notFound,
};
