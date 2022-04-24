import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
        password: new FormControl(this.selectedUser.password),
        email: new FormControl(this.selectedUser.email),
      });
      this.editForm.get('email').disable();
    });
  }

  onSubmit() {
    this.userData.updateUser(this.editForm.value, this.selectedUser.email);
  }

  closeForm() {
    this.openPopup = false;
  }
}
