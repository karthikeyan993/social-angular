import { Component } from '@angular/core';
import { AuthService } from './services/auth.services';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'social';

  constructor(private authServices: AuthService){
    this.authServices.autoLogin();
  }
}
