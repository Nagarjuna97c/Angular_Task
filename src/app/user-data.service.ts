import { Subject } from 'rxjs';
import { UserModel } from './user.model';

export class UserData {
  private usersList: any[] = [];
  loggedInUser: UserModel;
  isAdmin = false;

  userAddOrEditErrors = new Subject<string>();

  emitUserslist = new Subject<any[]>();
  openEditPopup = new Subject<any>();
  sendAdminOrNot = new Subject<boolean>();

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

  isAdminOrNot() {
    console.log('user service :', this.isAdmin);
    return this.isAdmin;
  }

  resetAdminData() {
    this.isAdmin = false;
  }
}
