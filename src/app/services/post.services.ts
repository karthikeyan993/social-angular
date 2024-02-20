import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.services";
import { Observable, filter, map, pipe } from "rxjs";



@Injectable()
export class PostServices {
    constructor(private authService:AuthService, private http:HttpClient){

    }

    getPost():Observable<any>{
        return this.http.get<any[]>(`https://social-angular-76383-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json`)
        .pipe(
            map(posts => {
            const filteredPosts = Object.values(posts)
            .filter(post => Object.values(post))
            return filteredPosts;
            })
          );
        }
}