import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostServices } from '../../../services/post.services';
import { AuthService } from '../../../services/auth.services';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  postype: string | undefined = undefined;
  pollForm!: FormGroup;
  postUpdateSubscription: Subscription | undefined;
  i: number = 0;
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
          console.log('post is ', this.post);
        }
      );
    });
    this.pollForm = new FormGroup({
      options: new FormControl(null, Validators.required),
    });
  }

  submitVote() {
    if (this.pollForm.valid) {
      const selectedOption = this.pollForm.value.options;
      console.log('Selected option:', selectedOption);
    } else {
      alert('Please select an option before voting.');
    }
  }

  ngOnDestroy(): void {
    this.postUpdateSubscription?.unsubscribe();
  }
}
