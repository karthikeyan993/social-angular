import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private authservice: AuthService, private router: Router) {}
  onLogOut() {
    this.authservice.logout();
    this.router.navigate(['/login']);
  }
}
