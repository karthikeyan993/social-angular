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
  currentUser: string | undefined;
  username: string | undefined;
  post: any[] | undefined;
  constructor(private authservice: AuthService, private router: Router, private postService:PostServices) {
    this.currentUser = this.authservice.currentUser;
    this.username = this.authservice.username; 
    this.post = undefined;
  }

  ngOnInit(): void {
      this.getPosts();
  }

  onLogOut() {
    this.authservice.logout();
    this.router.navigate(['/login']);
  }

  getPosts(){
    this.postService.getPost().subscribe(data=>{
      this.post = data;
      console.log(this.post);
    })
  }

  onDummy(){
    this.router.navigate(['/page-notfound']);
  }
  
}
