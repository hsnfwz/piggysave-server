import express from 'express';

// controllers
import * as ProfilesController from './profiles.controller.js';

// middleware
import { validateAccessToken } from '../middleware/auth0.middleware.js';

const profilesRouter = express.Router();

profilesRouter.post('/', ProfilesController.addProfile);
profilesRouter.delete('/:id', validateAccessToken, ProfilesController.removeProfile);
profilesRouter.all('*', ProfilesController.notFound);

export {
  profilesRouter
};
