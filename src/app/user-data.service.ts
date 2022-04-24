import { Subject } from 'rxjs';
import { UserModel } from './user.model';

export class UserData {
  private usersList: any[] = [];

  emitUserslist = new Subject<any[]>();
  openEditPopup = new Subject<any>();

  constructor() {
    this.usersList = JSON.parse(localStorage.getItem('userData'));
  }

  addUser(userDetails: Object) {
    // console.log(this.usersList);
    this.usersList.push(userDetails);
    const stringifiedUserList = JSON.stringify(this.usersList);
    localStorage.setItem('userData', stringifiedUserList);
  }

  getUserList() {
    return this.usersList.slice();
  }

  updateUser(user: UserModel, mail: string) {
    console.log(user);
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
