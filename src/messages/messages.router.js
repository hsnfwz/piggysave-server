import express from 'express';
import {
  getAdminMessage,
  getProtectedMessage,
  getPublicMessage,
} from './messages.service.js';
import {
  checkRequiredPermissions,
  validateAccessToken,
} from '../middleware/auth0.middleware.js';
import { AdminMessagesPermissions } from './messages-permissions.js';

const messagesRouter = express.Router();

messagesRouter.get('/public', (req, res) => {
  const message = getPublicMessage();

  res.status(200).json(message);
});

messagesRouter.get('/protected', validateAccessToken, (req, res) => {
  const message = getProtectedMessage();

  res.status(200).json(message);
});

messagesRouter.get(
  '/admin',
  validateAccessToken,
  checkRequiredPermissions([AdminMessagesPermissions.Read]),
  (req, res) => {
    const message = getAdminMessage();

    res.status(200).json(message);
  }
);

export {
  messagesRouter
};
