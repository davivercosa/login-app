import { Injectable, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class GlobalService implements OnInit {
  constructor(private messageService: MessageService) {}

  private loadingAnimation: boolean = false;

  ngOnInit(): void {}

  showLoadingAnimation() {
    this.loadingAnimation = true;
  }

  loadingAnimationState(): boolean {
    return this.loadingAnimation;
  }

  toast(icon: string, title: string, message: string) {
    this.loadingAnimation = false;

    if (message == '' || message == undefined) {
      message = 'falha na conexão, verifique sua conexão com a internet';
    }

    this.messageService.add({
      severity: icon,
      summary: title,
      detail: message,
      key: 'custom-global-toast',
    });
  }

  toastSucess(message: string) {
    this.toast('success', 'Success', message);
  }

  toastError(
    message:
      | string
      | {
          details: {
            message: string;
            context: {};
            type: string;
            path: string[];
          }[];
          original: {};
        }
  ) {
    if (typeof message === 'string') {
      this.toast('error', 'Warn', message);
    } else {
      message.details.forEach((detail) => {
        this.toast('error', 'Warn', detail.message);
      });
    }
  }
}
