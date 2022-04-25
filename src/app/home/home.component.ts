import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UserData } from '../user-data.service';
import { UserModel } from '../user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  usersList: any[] = [];
  validUser = true;
  validPassword = true;
  isAdmin = false;

  openPopup = false;
  selectedUser: UserModel;
  editForm: FormGroup;

  adminSubscription: Subscription;
  usersSubscription: Subscription;
  editSubscription: Subscription;

  constructor(private userData: UserData) {}

  ngOnInit(): void {
    this.isAdmin = this.userData.isAdminOrNot();

    this.adminSubscription = this.userData.sendAdminOrNot.subscribe((value) => {
      this.isAdmin = value;
    });

    this.usersList = this.userData.getUserList();
    this.usersSubscription = this.userData.emitUserslist.subscribe((data) => {
      this.usersList = data;
    });

    this.editSubscription = this.userData.openEditPopup.subscribe((data) => {
      this.openPopup = true;
      this.selectedUser = data;
      this.editForm = new FormGroup({
        username: new FormControl(
          this.selectedUser.username,
          Validators.required
        ),
        password: new FormControl(this.selectedUser.password, [
          Validators.required,
          this.userData.validatePassword.bind(this),
        ]),
        email: new FormControl(this.selectedUser.email),
      });
      this.editForm.get('email').disable();
    });
  }

  onSubmit() {
    this.userData.updateUser(this.editForm.value, this.selectedUser.email);
    this.openPopup = false;
  }

  closeForm() {
    this.openPopup = false;
  }

  ngOnDestroy(): void {
    this.adminSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
    this.editSubscription.unsubscribe();
  }
}
