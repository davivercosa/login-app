import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { GlobalService } from 'src/app/shared/services/global.service';
import { LoginService } from 'src/app/pages/login/services/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private loginService: LoginService
  ) {}

  forgotPasswordForm!: FormGroup;

  @Output() closeModalForgotPassword: EventEmitter<boolean> =
    new EventEmitter();

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [''],
    });
  }

  handleSendClick() {
    if (this.forgotPasswordForm.value.email === '') {
      this.globalService.toastError(
        'To receive the password recover email, you must fill all the fields'
      );

      return;
    }

    this.globalService.showLoadingAnimation();
    this.loginService.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next: (res) => {
        this.closeModalForgotPassword.emit(false);

        this.globalService.toastSucess(res.message);
      },
      error: (error) => {
        this.globalService.toastError(error.error.message);
      },
    });
  }
}
