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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private loginService: LoginService
  ) {}

  @Output() closeModalSignUp: EventEmitter<boolean> = new EventEmitter();

  signupForm!: FormGroup;

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
    });
  }

  handleCancelClick() {
    this.closeModalSignUp.emit(false);
  }

  handleRegisterClick() {
    if (
      this.signupForm.value.name === '' ||
      this.signupForm.value.email === '' ||
      this.signupForm.value.password === ''
    ) {
      this.globalService.toastError(
        'To proceed with the registration, you must fill all the fields'
      );

      return;
    }

    this.globalService.showLoadingAnimation();
    this.loginService.signup(this.signupForm.value).subscribe({
      next: (res) => {
        this.closeModalSignUp.emit(false);

        this.globalService.toastSucess(res.message);
      },
      error: (error) => {
        this.globalService.toastError(error.error.message);
      },
    });
  }
}
