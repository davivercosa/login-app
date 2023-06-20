import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { GlobalService } from 'src/app/shared/services/global.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private loginService: LoginService
  ) {}

  displayModalSignUp!: boolean;
  displayModalForgotPassword!: boolean;

  signinForm!: FormGroup;

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  login() {
    if (
      this.signinForm.value.email === '' ||
      this.signinForm.value.password === ''
    ) {
      this.globalService.toastError(
        'To proceed with the signin, you must fill all the fields'
      );

      return;
    }

    this.globalService.showLoadingAnimation();
    this.loginService.signin(this.signinForm.value).subscribe({
      next: (res) => {
        this.globalService.toastSucess(res.message);
      },
      error: (error) => {
        this.globalService.toastError(error.error.message);
      },
    });
  }

  showModalSignUp() {
    this.displayModalSignUp = true;
  }

  handleCloseModalSignup(event: boolean) {
    this.displayModalSignUp = event;
  }

  showModalForgotPassword() {
    this.displayModalForgotPassword = true;
  }

  handleCloseModalForgotPassword(event: boolean) {
    this.displayModalForgotPassword = event;
  }
}
