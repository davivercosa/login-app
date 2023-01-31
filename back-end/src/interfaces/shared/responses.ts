import { User } from '@prisma/client';
import Joi from 'joi';

import {
  IAuthenticate,
  ICreate,
  IForgotPassword,
} from '../user/user.interface';
// import { JwtPayload } from 'jsonwebtoken';

type ResponseStatus = 'success' | 'error';

export interface IApiResponse {
  status: ResponseStatus;
  message: string | Error;
  result?: User | string | null;
  code?: number;
}

export interface IRequestManagerResponse {
  status: string;
  message: Joi.ValidationError | ICreate | IAuthenticate | IForgotPassword;
}
