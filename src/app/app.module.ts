import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth.service';
import { AuthGaurdService } from './auth-gaurd-service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddUserComponent } from './add-user/add-user.component';
import { userData } from './user-data.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    AddUserComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [AuthService, AuthGaurdService, userData],
  bootstrap: [AppComponent],
})
export class AppModule {}
