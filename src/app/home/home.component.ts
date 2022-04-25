import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserData } from '../user-data.service';
import { UserModel } from '../user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  usersList: any[] = [];

  openPopup = false;
  selectedUser: UserModel;
  editForm: FormGroup;
  validUser = true;
  validPassword = true;

  constructor(private userData: UserData) {}

  ngOnInit(): void {
    this.usersList = this.userData.getUserList();
    this.userData.emitUserslist.subscribe((data) => {
      this.usersList = data;
    });

    this.userData.openEditPopup.subscribe((data) => {
      this.openPopup = true;
      this.selectedUser = data;
      this.editForm = new FormGroup({
        username: new FormControl(
          this.selectedUser.username,
          Validators.required
        ),
        password: new FormControl(this.selectedUser.password, [
          Validators.required,
          this.validatePassword.bind(this),
        ]),
        email: new FormControl(this.selectedUser.email),
      });
      this.editForm.get('email').disable();
    });
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

  onSubmit() {
    this.userData.updateUser(this.editForm.value, this.selectedUser.email);
    this.openPopup = false;
  }

  closeForm() {
    this.openPopup = false;
  }
}
