import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

export class AuthService {
  private loggedIn = false;
  getErrorMessage = new Subject<string>();

  isAuthenticated() {
    return new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
  }

  logIn(userDetails: FormGroup) {
    let errorMsg: string;
    if (userDetails['username'] !== 'Hari') {
      errorMsg = 'Invalid User';
      this.getErrorMessage.next(errorMsg);
    } else if (userDetails['password'] !== 'pola') {
      errorMsg = 'Invalid Password';
      this.getErrorMessage.next(errorMsg);
    } else if (
      userDetails['username'] === 'Hari' &&
      userDetails['password'] === 'pola'
    ) {
      this.loggedIn = true;
    }
    return this.loggedIn;
  }

  logOut() {
    this.loggedIn = false;
  }
}
