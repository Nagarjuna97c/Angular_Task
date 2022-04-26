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
import { UserData } from './user-data.service';
import { UserComponent } from './home/user/user.component';
import { CanDeactivateGaurd } from './can-deactivate-gaurd.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ConvertToNameFormat } from './pipe/convert-to-name.pipe';
import { ConvertToMailFormat } from './pipe/convert-to-email.pipe';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    AddUserComponent,
    UserComponent,
    EditProfileComponent,
    ConvertToNameFormat,
    ConvertToMailFormat,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [
    AuthService,
    AuthGaurdService,
    UserData,
    CanDeactivateGaurd,
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
