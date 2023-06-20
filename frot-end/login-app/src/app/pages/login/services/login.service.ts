import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IApiResponse } from 'src/app/shared/interfaces/backend.interface';
import {
  IForgotPassword,
  ISignin,
  ISingup,
} from 'src/app/pages/login/interfaces/login.interface';

import { appSettings } from 'src/app/shared/settings/settings';
import { devEnvironment } from 'src/app/shared/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  signup(userInfo: ISingup): Observable<IApiResponse> {
    return this.httpClient.post<IApiResponse>(
      devEnvironment.backend + appSettings.signup,
      userInfo
    );
  }

  signin(userInfo: ISignin): Observable<IApiResponse> {
    return this.httpClient.post<IApiResponse>(
      devEnvironment.backend + appSettings.signin,
      userInfo
    );
  }

  forgotPassword(userInfo: IForgotPassword): Observable<IApiResponse> {
    return this.httpClient.post<IApiResponse>(
      devEnvironment.backend + appSettings.forgotPassword,
      userInfo
    );
  }
}
