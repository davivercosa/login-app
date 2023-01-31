import express from 'express';

import HomeController from '../controllers/HomeController';
import UserController from '../controllers/UserController';

const router = express.Router();

router.get('/', HomeController.index);

// user
router.post('/user', UserController.create);
router.post('/signin', UserController.authenticate);
router.post('/forgot-password', UserController.forgotPassword);
router.put('/password', UserController.resetPassword);

export { router };
