import { Request, Response } from 'express';

import {
  authenticateSchema,
  createSchema,
  forgotPasswordSchema,
  resetPassordSchema,
} from '../interfaces/user/user.dtos';
import {
  IAuthenticate,
  ICreate,
  IForgotPassword,
  IResetPassword,
} from '../interfaces/user/user.interface';
import UserModel from '../models/UserModel';
import RequestManager from '../services/RequestManager';

class UserController {
  async create(req: Request, res: Response) {
    const verifyResp = RequestManager.verify(req, createSchema);

    if (verifyResp.status === 'error') {
      res.status(400);
      res.json({ status: 'error', message: verifyResp.message });

      return;
    }

    const newUserInfo = verifyResp.message as ICreate;

    const createResp = await UserModel.create(newUserInfo);

    if (createResp.status === 'error') {
      res.status(createResp.code!);

      delete createResp.code;

      res.json(createResp);

      return;
    }

    res.status(200);
    res.json(createResp);
  }

  async authenticate(req: Request, res: Response) {
    const verifyResp = RequestManager.verify(req, authenticateSchema);

    if (verifyResp.status === 'error') {
      res.status(400);
      res.json({ status: 'error', message: verifyResp.message });

      return;
    }

    const userInfo = verifyResp.message as IAuthenticate;

    const authenticateResp = await UserModel.authenticate(userInfo);

    if (authenticateResp.status === 'error') {
      res.status(authenticateResp.code!);

      delete authenticateResp.code;

      res.json(authenticateResp);

      return;
    }

    res.status(200);
    res.json(authenticateResp);
  }

  async forgotPassword(req: Request, res: Response) {
    const verifyResp = RequestManager.verify(req, forgotPasswordSchema);

    if (verifyResp.status === 'error') {
      res.status(400);
      res.json({ status: 'error', message: verifyResp.message });

      return;
    }

    const userInfo = verifyResp.message as IForgotPassword;

    const forgotPassowrdResp = await UserModel.forgotPassword(userInfo);

    if (forgotPassowrdResp.status === 'error') {
      res.status(forgotPassowrdResp.code!);

      delete forgotPassowrdResp.code;

      res.json(forgotPassowrdResp);

      return;
    }

    res.status(200);
    res.json(forgotPassowrdResp);
  }

  async resetPassword(req: Request, res: Response) {
    const verifyResp = RequestManager.verify(req, resetPassordSchema);

    if (verifyResp.status === 'error') {
      res.status(400);
      res.json({ status: 'error', message: verifyResp.message });

      return;
    }

    const newPasswordInfo = verifyResp.message as IResetPassword;

    const resetPasswordResp = await UserModel.resetPassword(newPasswordInfo);

    if (resetPasswordResp.status === 'error') {
      res.status(resetPasswordResp.code!);

      delete resetPasswordResp.code;

      res.json(resetPasswordResp);

      return;
    }

    res.status(200);
    res.json(resetPasswordResp);
  }
}

export default new UserController();
