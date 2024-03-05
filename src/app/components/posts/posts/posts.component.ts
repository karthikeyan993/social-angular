import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostServices } from '../../../services/post.services';
import { AuthService } from '../../../services/auth.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit, OnDestroy {
  post: any = [];
  fname: string | undefined = undefined;
  lname: string | undefined = undefined;
  imageUrl: string | undefined = undefined;
  postUpdateSubscription: Subscription | undefined;

  constructor(
    private postService: PostServices,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.fname = user?.firstName;
      this.lname = user?.lastName;
      this.imageUrl = user?.imageUrl;
      this.postUpdateSubscription = this.postService.postUpdated.subscribe(
        () => {
          this.post = this.postService.post;
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.postUpdateSubscription?.unsubscribe();
  }
}
