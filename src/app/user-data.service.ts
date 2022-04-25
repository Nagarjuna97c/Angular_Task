import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserModel } from './user.model';

export class UserData {
  private usersList: any[] = [];
  loggedInUser: UserModel;
  isAdmin = false;

  userAddOrEditErrors = new Subject<string>();

  emitUserslist = new Subject<any[]>();
  sendAdminOrNot = new Subject<boolean>();
  openEditPopup = new Subject<any>();
  sendUsernameAlreadyExists = new Subject<boolean>();

  constructor() {
    this.usersList = JSON.parse(localStorage.getItem('userData'));
  }

  validateUser(userDetails: UserModel) {
    const response = this.usersList.find(
      (each) => each.username === userDetails.username
    );
    if (response === undefined) {
      return 'Invalid User';
    } else if (response.password !== userDetails.password) {
      return 'Invalid Password';
    } else {
      console.log(userDetails);
      this.loggedInUser = response;
      if (response.isAdmin === 'yes') {
        this.isAdmin = true;
        console.log('user service validateuser:', this.isAdmin);
        this.sendAdminOrNot.next(true);
      }
      return true;
    }
  }

  getLoggedInUser() {
    console.log(this.loggedInUser);
    return this.loggedInUser;
  }

  addUser(userDetails: UserModel) {
    if (this.usersList.find((each) => each.username === userDetails.username)) {
      this.userAddOrEditErrors.next('Invalid User');
    } else if (
      this.usersList.find((each) => each.email === userDetails.email)
    ) {
      this.userAddOrEditErrors.next('Invalid Email');
    } else {
      this.usersList.push(userDetails);
      const stringifiedUserList = JSON.stringify(this.usersList);
      localStorage.setItem('userData', stringifiedUserList);
      return true;
    }
  }

  getUserList() {
    return this.usersList.slice();
  }

  updateUser(user: UserModel, mail: string) {
    const duplicateUser = this.usersList.find(
      (each) => each.username === user.username
    );

    console.log(duplicateUser);
    let updatedList: any[];
    if (duplicateUser !== undefined) {
      updatedList = this.usersList.map((each) => {
        if (each.email === mail && each.username === duplicateUser.username) {
          return {
            username: duplicateUser.username,
            password: user.password,
            email: mail,
            isAdmin: each.isAdmin,
          };
        }
        return each;
      });
    } else {
      console.log('here');
      updatedList = this.usersList.map((each) => {
        if (each.email === mail) {
          return {
            username: user.username,
            password: user.password,
            email: mail,
            isAdmin: each.isAdmin,
          };
        }
        return each;
      });
    }

    this.usersList = updatedList;
    const stringifiedUserList = JSON.stringify(this.usersList);
    localStorage.setItem('userData', stringifiedUserList);
    this.emitUserslist.next(this.usersList);
  }

  deleteUser(mail: string) {
    const updatedList = this.usersList.filter((each) => {
      if (each.email !== mail) {
        return each;
      }
    });
    this.usersList = updatedList;
    const stringifiedUserList = JSON.stringify(this.usersList);
    localStorage.setItem('userData', stringifiedUserList);
    this.emitUserslist.next(this.usersList);
  }

  isAdminOrNot() {
    return this.isAdmin;
  }

  resetAdminData() {
    this.isAdmin = false;
  }

  validatePassword(control: FormControl): { [s: string]: boolean } {
    const password = control.value;
    if (password !== null) {
      const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*'];
      let passwordContainsSpecialCharacters = false;
      let passwordContainsCapitalCase = password
        .split('')
        .some(
          (each: string) => each.charCodeAt(0) >= 65 && each.charCodeAt(0) <= 90
        );

      specialCharacters.forEach((each) => {
        if (password.indexOf(each) !== -1) {
          passwordContainsSpecialCharacters = true;
        }
      });

      if (
        password.length > 8 &&
        passwordContainsSpecialCharacters &&
        passwordContainsCapitalCase
      ) {
        control.setErrors({ invalidPassword: null });
        return null;
      } else {
        return { invalidPassword: true };
      }
    }
  }
}
