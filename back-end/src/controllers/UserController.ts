import { Request, Response } from 'express';

import { authenticateSchema, createSchema } from '../interfaces/user/user.dtos';
import { IAuthenticate, ICreate } from '../interfaces/user/user.interface';
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
}

export default new UserController();
