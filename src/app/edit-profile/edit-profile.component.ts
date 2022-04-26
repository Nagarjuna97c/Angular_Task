import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {
  canComponentDeactivate,
  CanDeactivateGaurd,
} from '../can-deactivate-gaurd.service';
import { UserData } from '../user-data.service';
import { UserModel } from '../user.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit, CanDeactivateGaurd {
  user: UserModel;
  editForm: FormGroup;
  validUser = true;
  validPassword = true;
  formSaved = false;
  duplicateUser = false;

  duplicateUserSubscription: Subscription;

  constructor(private userData: UserData) {}

  ngOnInit(): void {
    this.user = this.userData.getLoggedInUser();

    this.editForm = new FormGroup({
      username: new FormControl(this.user.username, Validators.required),
      password: new FormControl(this.user.password, [
        Validators.required,
        this.userData.validatePassword.bind(this),
      ]),
      email: new FormControl(this.user.email),
    });
    this.editForm.get('email').disable();
  }

  onSubmit() {
    this.userData.updateUser(this.editForm.value, this.user.email);
    this.formSaved = true;
  }

  canDeactivate(
    component: canComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.formSaved) {
      return true;
    } else {
      return confirm(
        'Do you want to move to another page?All the changes made will be lost if you do so.'
      );
    }
  }
}
