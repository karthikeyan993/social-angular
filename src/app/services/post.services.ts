import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { AuthService } from './auth.services';
import { Observable, filter, map, pipe, Subscription, Subject } from 'rxjs';

export interface Post {
  userId: string;
  timestamp?: Date;
  posts: {
    textpost: {
      content?: string;
    };
    imagepost: {
      imageUrl?: string;
      description?: string;
    };
    poll?: {
      question?: string;
      options?: string[];
    };
  };
}

@Injectable()
export class PostServices implements OnDestroy {
  userId: string | null | undefined = null;
  token: string | null | undefined = null;
  post: any = [];
  postSubscription: Subscription | undefined;
  postUpdated = new Subject<void>();

  constructor(private authService: AuthService, private http: HttpClient) {
    this.authService.user.subscribe((user) => {
      this.userId = user?.id;
      this.token = user?.token;
      if (this.userId && this.token) {
        this.fetchPost();
      }
    });
  }

  fetchPost(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }

    this.postSubscription = this.getPost().subscribe(
      (data) => {
        console.log('old', data);
        data.sort((a, b) => {
          const timestampA = new Date(a.timestamp).getTime();
          const timestampB = new Date(b.timestamp).getTime();
          return timestampB - timestampA; // Sort in descending order
        });
        console.log('new', data);
        this.post = data;
        this.postUpdated.next();
      },
      (error) => console.log(error)
    );
  }

  getPost() {
    const random = (Math.random() * 100).toFixed(2);
    //random=${random}&
    return this.http
      .get<any[]>(
        `https://social-angular-76383-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json?random=${random}&auth=${this.token}&orderBy="userId"&equalTo="${this.userId}"`
      )
      .pipe(
        map((posts) => {
          const filteredPosts = Object.values(posts).filter((post) =>
            Object.values(post)
          );
          return filteredPosts;
        })
      );
  }

  SendPost(formData: Post): Observable<any> {
    const timestamp = new Date().toISOString();
    return this.http.post<any[]>(
      `https://social-angular-76383-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json?auth=${this.token}`,
      {
        userId: this.userId,
        timestamp: timestamp,
        posts: {
          textpost: {
            content: formData.posts.textpost?.content,
          },
          imagepost: {
            imageUrl: formData.posts.imagepost?.imageUrl,
            description: formData.posts.imagepost?.description,
          },
          poll: {
            question: formData.posts.poll?.question,
            options: formData.posts.poll?.options,
          },
        },
      }
    );
  }

  ngOnDestroy(): void {
    this.postSubscription?.unsubscribe();
  }
}
