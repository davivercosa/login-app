export interface ICreate {
  email: string;
  name: string;
  password: string;
}

export interface IAuthenticate {
  email: string;
  password: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  new_password: string;
  token: string;
}
