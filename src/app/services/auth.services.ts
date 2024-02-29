import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../environment/environment';
import { User } from '../model/user.model';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface AuthData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable()
export class AuthService {
  currentUser: string | undefined;
  username: string | undefined;
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private http: HttpClient
  ) {
    this.currentUser = undefined;
  }

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      resolve(this.currentUser);
    });
    return promise;
  }

  // Signup
  signup(userData: any) {
    return this.http
      .post<AuthData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseWebAPIKey}`,
        {
          email: userData.email,
          password: userData.password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((resData) => {
          console.log('sign up pipe');
          this.handleAuthentication(
            userData.fname,
            userData.lname,
            userData.imageUrl,
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  // log in new
  login(email: string, password: string) {
    return this.http
      .post<AuthData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseWebAPIKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((resData) => {
          this.handleAuthenticationLogIn(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    if (isPlatformBrowser(this.platformId)) {
      const userDataString = localStorage.getItem('userData');
      const userData: {
        firstName: string;
        lastName: string;
        imageUrl: string;
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = userDataString ? JSON.parse(userDataString) : null;
      if (!userData) {
        return;
      }

      const loadedUser = new User(
        userData.firstName,
        userData.lastName,
        userData.imageUrl,
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        this.user.next(loadedUser);
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.autoLogout(expirationDuration);
      }
    }
  }

  loggedIn = false;

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    fname: string,
    lname: string,
    imageUrl: string,
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    console.log('register handle called');
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      fname,
      lname,
      imageUrl,
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
    // this.user.next(user);
    // this.autoLogout(expiresIn * 1000);
    // localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleAuthenticationLogIn(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    this.http
      .get<any>(
        `https://social-angular-76383-default-rtdb.asia-southeast1.firebasedatabase.app/users.json?orderBy="email"&equalTo="${email}"`
      )
      .subscribe((userData) => {
        // Extract required details from userData
        console.log('fdfdfd', userData);
        const userKey = Object.keys(userData)[0]; // Assuming there's only one user with the given email
        const getUser = userData[userKey];
        const firstName = getUser && getUser.fname ? getUser.fname : '';
        const lastName = getUser && getUser.lname ? getUser.lname : '';
        const imageUrl = getUser && getUser.imageUrl ? getUser.imageUrl : '';
        const expirationDate = new Date(
          new Date().getTime() + expiresIn * 1000
        );

        // Construct the User object
        const user = new User(
          firstName,
          lastName,
          imageUrl,
          email,
          userId,
          token,
          expirationDate
        );

        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
        this.router.navigate(['/']);
      });
  }
}
