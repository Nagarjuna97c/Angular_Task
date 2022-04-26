import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserData } from './user-data.service';
import { UserModel } from './user.model';

// Stores,Changes and sends the authorization data
@Injectable()
export class AuthService {
  private loggedIn = false;
  getErrorMessage = new Subject<string>();

  constructor(private userData: UserData) {}

  isAuthenticated() {
    return new Promise((resolve, reject) => {
      resolve(this.loggedIn);
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
    this.userData.resetAdminData();
    this.loggedIn = false;
  }
}
