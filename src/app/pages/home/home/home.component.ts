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

  constructor(
    private authservice: AuthService,
    private router: Router,
    private postService: PostServices
  ) {}  

  ngOnInit(): void {
    this.postService.getPost().subscribe((data) => {
      this.post = data;
      console.log('this is post', this.post);
    });
    this.authservice.user.subscribe((user) => {
      this.fname = user?.firstName;
      this.lname = user?.lastName;
      this.imageUrl = user?.imageUrl;
    });
  }

  onLogOut() {
    this.authservice.logout();
    this.router.navigate(['/login']);
  }

  onDummy() {
    this.router.navigate(['/page-notfound']);
  }
}
