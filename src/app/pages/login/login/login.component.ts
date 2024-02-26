import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.services';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { tap, pipe } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  logForm: FormGroup;

  constructor(private authservice: AuthService, private router: Router) {
    this.logForm = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null),
    });
  }

  ngOnInit(): void {
    
  }

   onLogIn() {
    const username = this.logForm.get('username')?.value;
    const password = this.logForm.get('password')?.value;

    let submit = this.authservice.login(username, password).subscribe(() =>{

    }, error => {
        alert("Please enter valid details");
      }
    )
   }

   navigateRegister(){
    this.router.navigate(['/signup']);
   }
}
