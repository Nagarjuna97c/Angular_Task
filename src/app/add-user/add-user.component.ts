import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {
  canComponentDeactivate,
  CanDeactivateGaurd,
} from '../can-deactivate-gaurd.service';
import { UserData } from '../user-data.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit, CanDeactivateGaurd {
  userDetails: FormGroup;
  userAlreadyExists = false;
  emailAlreadyExists = false;
  formSaved = false;

  constructor(private userData: UserData) {}

  ngOnInit(): void {
    this.userDetails = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        this.validatePassword.bind(this),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      isAdmin: new FormControl('no'),
    });

    this.userData.userAddOrEditErrors.subscribe((error) => {
      this.userAlreadyExists = false;
      this.emailAlreadyExists = false;
      if (error === 'Invalid User') {
        this.userAlreadyExists = true;
      }
      if (error === 'Invalid Email') {
        this.emailAlreadyExists = true;
      }
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

  onAddUser() {
    const result = this.userData.addUser(this.userDetails.value);
    if (result) {
      this.formSaved = true;
    } else {
      this.formSaved = false;
    }
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
