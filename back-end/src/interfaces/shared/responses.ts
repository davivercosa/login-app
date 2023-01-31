import { User } from '@prisma/client';
import Joi from 'joi';
import { JsonWebTokenError } from 'jsonwebtoken';

import {
  IAuthenticate,
  ICreate,
  IForgotPassword,
  IResetPassword,
} from '../user/user.interface';
import { IToken } from './interfaces';

type ResponseStatus = 'success' | 'error';

export interface IApiResponse {
  status: ResponseStatus;
  message: string | Error | JsonWebTokenError;
  result?: User | string | null | IToken;
  code?: number;
}

export interface IRequestManagerResponse {
  status: string;
  message:
    | Joi.ValidationError
    | ICreate
    | IAuthenticate
    | IForgotPassword
    | IResetPassword;
}
