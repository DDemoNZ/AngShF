import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {BodyComponent} from './components/body/body.component';
import {ErrorPageComponent} from './components/error-page-component/error-page.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {ShopComponent} from './components/shop/shop.component';
import {BucketComponent} from './components/bucket/bucket.component';
import {ProfileComponent} from './components/profile/profile.component';
import {AuthGuard} from './service/auth-service/auth.guard';
import {AdminComponent} from './components/admin/admin.component';
import {ManageUsersComponent} from './components/admin/manage-users/manage-users.component';
import {ManageItemsComponent} from './components/admin/manage-items/manage-items.component';

const routes: Routes = [
  {
    path: '', component: BodyComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'registration', component: RegistrationComponent
  },
  {
    path: 'items', component: ShopComponent, canActivate: [AuthGuard]
  },
  {
    path: 'second', component: LoginComponent
  },
  {
    path: 'bucket', component: BucketComponent, canActivate: [AuthGuard]
  },
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
      {
        path: 'users', component: ManageUsersComponent, canActivate: [AuthGuard]
      },
      {
        path: 'items', component: ManageItemsComponent, canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'error', component: ErrorPageComponent
  },
  {
    path: '**', redirectTo: '/error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
