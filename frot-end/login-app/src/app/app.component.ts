import { Component } from '@angular/core';

import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public globalService: GlobalService) {}
}
