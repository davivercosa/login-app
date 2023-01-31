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
