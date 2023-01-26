import bcrypt from 'bcrypt';

import { prisma } from '../database/prisma';
import { IApiResponse } from '../interfaces/shared/responses';
import { ICreate } from '../interfaces/user/user.interface';

class UserModel {
  async create(newUserInfo: ICreate): Promise<IApiResponse> {
    try {
      const findResp = await this.find(newUserInfo.email);

      if (findResp.status === `error`) {
        return findResp;
      }

      if (findResp.result !== null) {
        return {
          status: 'error',
          message: 'User already registered',
          code: 401,
        };
      }

      const hashedPassword = await bcrypt.hash(newUserInfo.password, 10);

      await prisma.user.create({
        data: {
          email: newUserInfo.email,
          name: newUserInfo.name,
          password: hashedPassword,
        },
      });

      return {
        status: 'success',
        message: 'User registered successfully',
      };
    } catch (error) {
      const err = error as Error;

      console.log(err);

      return { status: 'error', message: err, code: 500 };
    }
  }

  async find(userEmail: string): Promise<IApiResponse> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      });

      return {
        status: `success`,
        message: 'Searched user registration',
        result: user,
      };
    } catch (error) {
      const err = error as Error;

      console.log(err);

      return { status: 'error', message: err, code: 500 };
    }
  }
}

export default new UserModel();
