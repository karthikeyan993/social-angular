import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.services';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  registerForm: FormGroup;

  constructor(private authservice: AuthService, private router: Router, private http:HttpClient) {
    this.registerForm = new FormGroup({
      email: new FormControl(null),
      username: new FormControl(null),
      password: new FormControl(null),
    });
  }

  ngOnInit(): void {}

  onRegisterSubmit() {
    const email = this.registerForm.get('email')?.value;
    const username = this.registerForm.get('username')?.value;
    const password = this.registerForm.get('password')?.value;

    let submit = this.authservice.signup(username,email, password).subscribe(
      data =>{
          this.http.post<any>('https://social-angular-76383-default-rtdb.asia-southeast1.firebasedatabase.app/users.json', {email: email, imageUrl : '', username: username})
        .subscribe(
          this.authservice.username = username
        );
        this.authservice.currentUser = data.email;
        
        this.router.navigate(['/']);
      }, error => {
        alert("Please enter valid details");
      }
    )
  }

  navigateLogIn(){
    this.router.navigate(['/login']);
  }
}
