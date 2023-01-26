import { Request, Response } from 'express';

import { createSchema } from '../interfaces/user/user.dtos';
import { ICreate } from '../interfaces/user/user.interface';
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
}

export default new UserController();
