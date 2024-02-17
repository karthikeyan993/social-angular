import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  currentUser: { username: string; password: string } | undefined;

  constructor(private router: Router) {
    this.currentUser = undefined;
  }

  loggedIn = false;
  users = [
    { username: 'karthik', password: 'xyz123' },
    { username: 'user1', password: 'password' },
    { username: 'user2', password: 'password' },
  ];
  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        // if (this.currentUser != undefined) {
        //   resolve(true);
        // } else {
        //   resolve(false);
        // }
        resolve(this.currentUser);
      }, 500);
    });
    return promise;
  }

  // login() {
  //   this.loggedIn = true;
  // }

  logout() {
    this.currentUser = undefined;
    this.router.navigate(['/login']);
  }

  validateLogin(credentials: { username: string; password: string }) {
    const isValid = this.users.find(
      (user) =>
        user.username === credentials.username &&
        user.password === credentials.password
    );
    if (isValid) {
      this.currentUser = isValid;
      return true;
    } else {
      return false;
    }
  }
}
