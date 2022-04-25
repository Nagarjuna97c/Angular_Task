import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AuthGaurdService } from './auth-gaurd-service';
import { CanDeactivateGaurd } from './can-deactivate-gaurd.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGaurdService] },
  {
    path: 'add-user',
    component: AddUserComponent,
    canActivate: [AuthGaurdService],
    canDeactivate: [CanDeactivateGaurd],
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [AuthGaurdService],
    canDeactivate: [CanDeactivateGaurd],
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
