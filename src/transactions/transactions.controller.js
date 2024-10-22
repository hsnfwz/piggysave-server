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
  addTransaction,
  updateTransaction,
  removeTransaction,
  notFound,
};
