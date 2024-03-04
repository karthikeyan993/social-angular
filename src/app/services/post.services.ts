import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.services';
import { Observable, filter, map, pipe } from 'rxjs';
import { User } from '../model/user.model';

export interface Post {
  userId: string;
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
export class PostServices {
  userId: string | null | undefined = null;
  token: string | null | undefined = null;
  constructor(private authService: AuthService, private http: HttpClient) {
    console.log('post service', this.authService.user);
    this.authService.user.subscribe((user) => {
      this.userId = user?.id;
      this.token = user?.token;
    });
  }

  getPost(): Observable<any> {
    return this.http
      .get<any[]>(
        `https://social-angular-76383-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json?auth=${this.token}&orderBy="userId"&equalTo="${this.userId}"`
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
    return this.http.post<any[]>(
      `https://social-angular-76383-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json?auth=${this.token}`,
      {
        userId: this.userId,
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
}
