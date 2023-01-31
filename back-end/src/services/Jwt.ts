import { User } from '@prisma/client';
import * as dotenv from 'dotenv';
import jwt, { JsonWebTokenError, Secret } from 'jsonwebtoken';

import { IToken } from '../interfaces/shared/interfaces';
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

      // console.log(token, 'here token');

      const greetResp = UserModel.greet(userInfo.name);

      if (greetResp.status === 'error') {
        return greetResp;
      }

      const message = greetResp.result as string;

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

  authenticateToken(token: string): IApiResponse {
    try {
      jwt.verify(token, secret);

      const decodedToken = jwt.decode(token) as IToken;

      return {
        status: 'success',
        message: 'User successfully authenticated',
        result: decodedToken,
      };
    } catch (error) {
      const err = error as JsonWebTokenError;

      console.log(err);

      if (err.name === 'JsonWebTokenError') {
        return {
          status: 'error',
          message: 'User unauthorized',
          code: 401,
        };
      }

      if (err.name === 'TokenExpiredError') {
        return { status: 'error', message: 'Expired token', code: 401 };
      }

      return { status: 'error', message: err, code: 500 };
    }
  }
}

export default new Jwt();
