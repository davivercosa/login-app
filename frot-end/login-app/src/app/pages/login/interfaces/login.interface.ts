export interface ISingup {
  name: string;
  email: string;
  password: string;
}

export interface ISignin {
  email: string;
  password: string;
}

export interface IForgotPassword {
  email: string;
}
