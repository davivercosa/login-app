import { User } from '@prisma/client';
import Joi from 'joi';

import { ICreate } from '../user/user.interface';
// import { JwtPayload } from 'jsonwebtoken';

type ResponseStatus = 'success' | 'error';

export interface IApiResponse {
  status: ResponseStatus;
  message: string | Error;
  result?: ICreate | User | null;
  code?: number;
}

export interface IRequestManagerResponse {
  status: string;
  message: Joi.ValidationError | ICreate;
}
