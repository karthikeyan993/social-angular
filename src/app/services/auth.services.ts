import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from '../../environment/environment';

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

  constructor(private router: Router, private http: HttpClient) {
    this.currentUser = undefined;
  }

  isAuthenticated(){
    const promise = new Promise((resolve, reject) => {
      resolve(this.currentUser);
    });
    return promise;
  }

  // Signup 
  signup(username:string, email: string, password:string){
    return this.http.post<AuthData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseWebAPIKey}',
  }`,{
      email: email,
      password: password,
      returnSecureToken: true
    });
  }

  // log in new
  login(email: string, password:string){
    return this.http.post<AuthData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseWebAPIKey}`,{
      email: email,
      password: password,
      returnSecureToken: true
    });
  }
  


  loggedIn = false;
  
  // login() {
  //   this.loggedIn = true;
  // }

  logout() {
    this.currentUser = undefined;
    this.router.navigate(['/login']);
  }

  // getUsername(){
  //   this.http.get('https://social-angular-76383-default-rtdb.asia-southeast1.firebasedatabase.app/users.json')
  //   .pipe(
  //     map(users => {
  //       const user:any = Object.values(users).find(user => user.email === this.currentUser);
  //       if (user) {
  //         this.username = user.username;
  //       }
  //     }),
  //   ).subscribe();
  // }

  // getUserdata() {
  //   this.http.get('https://social-angular-76383-default-rtdb.asia-southeast1.firebasedatabase.app/users.json')
  //   .pipe(
  //     map(users => {
  //       const user:any = Object.values(users).find(user => user.email === this.currentUser);
  //       if (user) {
  //         this.username = user.username;
  //       } else {

  //       }
  //     }),

  //   )
  //   .subscribe(data=>console.log(data));

  //   return this.http.get<any>('https://social-angular-76383-default-rtdb.asia-southeast1.firebasedatabase.app/users.json')
  //     .pipe(
  //       map(users => {
  //         const userData = Object.values(users).find((user: any) => user.email === this.currentUser);
  //         return userData;
  //       })
  //     );
  // }

  // validateLogin(credentials: { username: string; password: string }) {
  //   const isValid = this.users.find(
  //     (user) =>
  //       user.username === credentials.username &&
  //       user.password === credentials.password
  //   );
  //   if (isValid) {
  //     this.currentUser = isValid;
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
