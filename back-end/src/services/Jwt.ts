import { User } from '@prisma/client';
import * as dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';

import { IApiResponse } from '../interfaces/shared/responses';
import UserModel from '../models/UserModel';

dotenv.config();

const secret: Secret = process.env.JWT_SECRET!;

class Jwt {
  createToken(userInfo: User): IApiResponse {
    try {
      const token = jwt.sign(
        {
          id: userInfo.id,
        },
        secret,
        { expiresIn: userInfo.changePassword === 1 ? '0.5h' : '1d' },
      );

      const greetUserResp = UserModel.greetUser(userInfo.name);

      if (greetUserResp.status === 'error') {
        return greetUserResp;
      }

      const message = greetUserResp.result as string;

      return {
        status: 'success',
        message,
        result: token,
      };
    } catch (error) {
      const err = error as Error;

      console.log(err);

      return { status: 'error', message: err, code: 500 };
    }
  }
}

export default new Jwt();
