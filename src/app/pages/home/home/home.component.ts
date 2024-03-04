import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.services';
import { Router } from '@angular/router';
import { PostServices } from '../../../services/post.services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  fname: string | undefined;
  lname: string | undefined;
  imageUrl: string | undefined;
  post: any = [];
  showModalValue: boolean = false;
  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authservice.user.subscribe((user) => {
      this.fname = user?.firstName;
      this.lname = user?.lastName;
      this.imageUrl = user?.imageUrl;
    });
  }

  onDummy() {
    this.router.navigate(['/page-notfound']);
  }
  newPostHandler() {
    this.showModalValue = true;
  }
  closeModalHome() {
    this.showModalValue = false;
  }
}
