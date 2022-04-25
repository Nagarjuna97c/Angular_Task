import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
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

  constructor(private userData: UserData) {}

  ngOnInit(): void {
    this.user = this.userData.getLoggedInUser();
    console.log(this.user);

    this.editForm = new FormGroup({
      username: new FormControl(this.user.username, Validators.required),
      password: new FormControl(this.user.password, [
        Validators.required,
        this.validatePassword.bind(this),
      ]),
      email: new FormControl(this.user.email),
    });
    this.editForm.get('email').disable();
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
