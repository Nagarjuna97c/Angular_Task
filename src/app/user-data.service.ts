import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserModel } from './user.model';

export class UserData {
  private usersList: any[] = [];

  userAddOrEditErrors = new Subject<string>();

  emitUserslist = new Subject<any[]>();
  openEditPopup = new Subject<any>();

  constructor() {
    this.usersList = JSON.parse(localStorage.getItem('userData'));
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
    const updatedList = this.usersList.map((each) => {
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
}
