import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authservice: AuthService, private router: Router) {}
  onLogIn() {
    this.authservice.login();
    this.router.navigate(['/']);
  }
}
