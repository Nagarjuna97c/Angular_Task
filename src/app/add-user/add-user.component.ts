import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from '../user-data.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  userDetails: FormGroup;

  constructor(private userData: UserData) {}

  ngOnInit(): void {
    this.userDetails = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      isAdmin: new FormControl('no'),
    });
  }

  onAddUser() {
    this.userData.addUser(this.userDetails.value);
  }
}
