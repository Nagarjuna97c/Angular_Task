import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { UserData } from './user-data.service';
import { UserModel } from './user.model';

// Stores,Changes and sends the authorization data
@Injectable()
export class AuthService {
  private loggedIn = false;
  getErrorMessage = new Subject<string>();

  constructor(
    private userData: UserData,
    private cookieService: CookieService
  ) {}

  isAuthenticated() {
    return new Promise((resolve, reject) => {
      resolve(!(this.cookieService.get('user') === ''));
    });
  }

  logIn(userDetails: UserModel) {
    const result = this.userData.validateUser(userDetails);
    if (typeof result !== 'string') {
      this.loggedIn = true;
      return true;
    } else {
      this.loggedIn = false;
      this.getErrorMessage.next(result);
      return false;
    }
  }

  logOut() {
    this.cookieService.delete('user');
    this.userData.resetAdminData();
    this.loggedIn = false;
  }
}
