import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  currentUser: string | undefined;
  constructor(private authservice: AuthService, private router: Router) {
    this.currentUser = this.authservice.currentUser?.username;
  }
  onLogOut() {
    this.authservice.logout();
    this.router.navigate(['/login']);
  }
  onSomepage() {
    this.router.navigate(['/somepage']);
  }
}
