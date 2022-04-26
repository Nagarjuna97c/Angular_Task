import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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
export class AddUserComponent implements OnInit, OnDestroy, CanDeactivateGaurd {
  userDetails: FormGroup;
  userAlreadyExists = false;
  emailAlreadyExists = false;
  formSaved = false;
  isAdmin = false;

  errorsSubscription: Subscription;
  adminSubscription: Subscription;

  constructor(private userData: UserData, private router: Router) {}

  ngOnInit(): void {
    // Checking Whether user is admin
    this.isAdmin = this.userData.isAdminOrNot();
    if (this.isAdmin === false) {
      this.router.navigate(['/home']);
    }

    // Checking Whether user is admin
    this.adminSubscription = this.userData.sendAdminOrNot.subscribe((value) => {
      this.isAdmin = value;
      if (this.isAdmin === false) {
        this.router.navigate(['/home']);
      }
    });

    // Form Creation and Validation
    this.userDetails = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        this.userData.validatePassword.bind(this),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      isAdmin: new FormControl('no'),
    });

    // Avilability check of username and email for new user
    this.errorsSubscription = this.userData.userAddOrEditErrors.subscribe(
      (error) => {
        this.userAlreadyExists = false;
        this.emailAlreadyExists = false;
        if (error === 'Invalid User') {
          this.userAlreadyExists = true;
        }
        if (error === 'Invalid Email') {
          this.emailAlreadyExists = true;
        }
      }
    );
  }

  // Add user
  onAddUser() {
    const result = this.userData.addUser(this.userDetails.value);
    if (result) {
      this.formSaved = true;
    } else {
      this.formSaved = false;
    }
  }

  // Confirmation when moving away from form
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

  // Destroting Subscriptions
  ngOnDestroy(): void {
    this.errorsSubscription.unsubscribe();
    this.adminSubscription.unsubscribe();
  }
}
