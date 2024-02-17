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
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.services';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [provideClientHydration(), AuthGuard, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
