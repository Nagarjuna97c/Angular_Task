import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginData: FormGroup;
  validUser = true;
  validPassword = true;

  errorSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginData = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });

    this.errorSubscription = this.authService.getErrorMessage.subscribe(
      (errorMsg) => {
        if (errorMsg === 'Invalid User') {
          this.validUser = false;
          this.validPassword = true;
        } else {
          this.validUser = true;
          this.validPassword = false;
        }
      }
    );
  }

  onSubmit() {
    const value = this.loginData.value;
    const response = this.authService.logIn(value);
    if (response) {
      this.router.navigate(['/home']);
    }
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}
