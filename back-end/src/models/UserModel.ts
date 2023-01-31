import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

import { prisma } from '../database/prisma';
import { IApiResponse } from '../interfaces/shared/responses';
import {
  IAuthenticate,
  ICreate,
  IForgotPassword,
} from '../interfaces/user/user.interface';
import Jwt from '../services/Jwt';
import mail from '../services/mail';

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

  async authenticate(userInfo: IAuthenticate): Promise<IApiResponse> {
    try {
      const findResp = await this.find(userInfo.email);

      if (findResp.status === `error`) {
        return findResp;
      }

      if (findResp.result === null) {
        return {
          status: 'error',
          message: 'Invalid credentials',
          code: 401,
        };
      }

      const userDbInfo = findResp.result as User;

      const compareResp = await bcrypt.compare(
        userInfo.password,
        userDbInfo.password,
      );

      if (!compareResp) {
        return {
          status: 'error',
          message: 'Invalid credentials',
          code: 401,
        };
      }

      const createTokenResp = Jwt.createToken(userDbInfo);

      if (createTokenResp.status === 'error') {
        return createTokenResp;
      }

      return createTokenResp;
    } catch (error) {
      const err = error as Error;

      console.log(err);

      return { status: 'error', message: err, code: 500 };
    }
  }

  async forgotPassword(userInfo: IForgotPassword): Promise<IApiResponse> {
    try {
      const findResp = await this.find(userInfo.email);

      if (findResp.status === `error`) {
        return findResp;
      }

      if (findResp.result === null) {
        return {
          status: 'error',
          message: 'Invalid credentials',
          code: 401,
        };
      }

      const userDbInfo = findResp.result as User;

      const updatedUserDbInfo = await prisma.user.update({
        where: {
          email: `${userDbInfo.email}`,
        },
        data: {
          changePassword: 1,
        },
      });

      const createTokenResp = Jwt.createToken(updatedUserDbInfo);

      if (createTokenResp.status === 'error') {
        return createTokenResp;
      }

      const token = createTokenResp.result as string;

      return await mail(updatedUserDbInfo.email, token);
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

  greetUser(username: string): IApiResponse {
    try {
      const [loginHour] = new Intl.DateTimeFormat('default', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
        timeZone: 'America/Fortaleza',
      })
        .format(new Date())
        .split(':');

      if (Number(loginHour) >= 4 && Number(loginHour) < 12) {
        return {
          status: 'success',
          message: 'Successfull user greeting',
          result: `Goog Morning, ${username}`,
        };
      }

      if (Number(loginHour) >= 12 && Number(loginHour) < 18) {
        return {
          status: 'success',
          message: 'Successfull user greeting',
          result: `Goog afternoon, ${username}`,
        };
      }

      return {
        status: 'success',
        message: 'Successfull user greeting',
        result: `Goog night, ${username}`,
      };
    } catch (error) {
      const err = error as Error;

      console.log(err);

      return { status: 'error', message: err, code: 500 };
    }
  }
}

export default new UserModel();
