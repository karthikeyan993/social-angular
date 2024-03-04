import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound/pagenotfound.component';
import { HomeComponent } from './pages/home/home/home.component';
import { LoginComponent } from './pages/login/login/login.component';
import { AuthGuard } from './services/auth-guard.services';
import { AuthService } from './services/auth.services';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './pages/signup/signup/signup.component';
import { PostServices } from './services/post.services';
import { HeaderComponent } from './components/header/header/header.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { PostsComponent } from './components/posts/posts/posts.component';
import { User } from './model/user.model';
import { NewpostComponent } from './components/newpost/newpost/newpost.component';

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    PostsComponent,
    NewpostComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule],
  providers: [provideClientHydration(), AuthGuard, AuthService, PostServices],
  bootstrap: [AppComponent],
})
export class AppModule {}
