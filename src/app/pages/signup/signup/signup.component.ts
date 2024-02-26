import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.services';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {  switchMap, tap } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  registerForm: FormGroup;

  constructor(private authservice: AuthService, private router: Router, private http: HttpClient) {
    this.registerForm = new FormGroup({
      fname: new FormControl(null),
      lname: new FormControl(null),
      imageUrl: new FormControl(null),
      email: new FormControl(null),
      username: new FormControl(null),
      password: new FormControl(null),
    });
  }

  ngOnInit(): void { }

  onRegisterSubmit() {
    const formData = this.registerForm.value;

    this.authservice.signup(formData).pipe(
      switchMap(resData => {
      return this.http.post('https://social-angular-76383-default-rtdb.asia-southeast1.firebasedatabase.app/users.json', { fname: formData.fname,lname: formData.lname,email: formData.email, imageUrl: formData.imageUrl })
    }),
    tap(() => {
      this.router.navigate(['/']);
    })
    ).subscribe(() => { }, error => { alert("Please enter valid details"); });
  }

  navigateLogIn() {
    this.router.navigate(['/login']);
  }
}
