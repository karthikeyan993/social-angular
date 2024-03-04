import { Component, OnInit } from '@angular/core';
import { PostServices } from '../../../services/post.services';
import { AuthService } from '../../../services/auth.services';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  post: any = [];
  fname: string | undefined = undefined;
  lname: string | undefined = undefined;
  imageUrl: string | undefined = undefined;

  constructor(
    private postService: PostServices,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.fname = user?.firstName;
      this.lname = user?.lastName;
      this.imageUrl = user?.imageUrl;
    });

    this.postService.getPost().subscribe((data) => {
      this.post = data;
      console.log('this is post', this.post);
    });
  }

  getPost() {
    this.postService.getPost().subscribe((data) => {
      this.post = data;
      console.log('this is post', this.post);
    });
  }
}
