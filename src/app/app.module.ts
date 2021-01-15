import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ShopComponent} from './components/shop/shop.component';
import {OrderComponent} from './components/order/order.component';
import {BucketComponent} from './components/bucket/bucket.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {ErrorPageComponent} from './components/error-page-component/error-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './components/login/login.component';
import {BodyComponent} from './components/body/body.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {AuthServiceComponent} from './service/auth-service/auth-service.component';
import { ProfileComponent } from './components/profile/profile.component';
import {TokenInterceptor} from './service/auth-service/TokenInterceptor';
import {MatSliderModule} from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    LoginComponent,
    ErrorPageComponent,
    RegistrationComponent,
    ShopComponent,
    BucketComponent,
    OrderComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    // FlexModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSliderModule,
    MatFormFieldModule,
  ],
  providers: [
    // AuthServiceComponent, {provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptorService, multi: true}
    AuthServiceComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
