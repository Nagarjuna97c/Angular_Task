import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData: FormGroup;
  validUser = true;
  validPassword = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginData = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });

    this.authService.getErrorMessage.subscribe((errorMsg) => {
      if (errorMsg === 'Invalid User') {
        this.validUser = false;
        this.validPassword = true;
      } else {
        this.validUser = true;
        this.validPassword = false;
      }
    });
  }

  onSubmit() {
    const value = this.loginData.value;
    const response = this.authService.logIn(value);
    if (response) {
      this.router.navigate(['/home']);
    }
  }
}
