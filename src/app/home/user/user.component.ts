import { Component, Input, OnInit } from '@angular/core';
import { UserData } from 'src/app/user-data.service';
import { UserModel } from 'src/app/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @Input() user: UserModel;

  constructor(private userData: UserData) {}

  ngOnInit(): void {}

  openEditPopup() {
    this.userData.openEditPopup.next(this.user);
  }

  deleteUser() {
    this.userData.deleteUser(this.user.email);
  }
}
