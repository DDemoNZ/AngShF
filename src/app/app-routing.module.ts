import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {BodyComponent} from './components/body/body.component';
import {ErrorPageComponent} from './components/error-page-component/error-page.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {ShopComponent} from './components/shop/shop.component';
import {BucketComponent} from './components/bucket/bucket.component';
import {ProfileComponent} from './components/profile/profile.component';

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
    path: 'items', component: ShopComponent
  },
  {
    path: 'second', component: LoginComponent
  },
  {
    path: 'bucket', component: BucketComponent
  },
  {
    path: 'profile', component: ProfileComponent
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
export class AppRoutingModule { }
