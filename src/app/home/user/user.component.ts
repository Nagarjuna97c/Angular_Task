import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserData } from 'src/app/user-data.service';
import { UserModel } from 'src/app/user.model';

@Component({
  selector: '[app-user]',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  @Input() user: UserModel;
  @Input() isAdmin: boolean;
  adminSubscription: Subscription;

  constructor(private userData: UserData) {}

  ngOnInit(): void {
    this.adminSubscription = this.userData.sendAdminOrNot.subscribe((truth) => {
      this.isAdmin = truth;
    });
  }

  openEditPopup() {
    this.userData.openEditPopup.next(this.user);
  }

  deleteUser() {
    this.userData.deleteUser(this.user.email);
  }

  ngOnDestroy(): void {
    this.adminSubscription.unsubscribe();
  }
}
