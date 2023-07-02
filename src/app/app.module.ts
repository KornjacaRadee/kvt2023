import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginformComponent } from './loginform/loginform.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterformComponent } from './registerform/registerform.component';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { TokeninterceptorInterceptor } from './services/interceptors/tokeninterceptor.interceptor';
import { ToastrModule } from 'ngx-toastr';

import { ApiService } from 'src/app/services/api.service.service';
import { AuthServiceService } from"src/app/services/auth.service.service";
import {UserService} from 'src/app/services/user.service.service';
import {ConfigService} from 'src/app/services/config.service.service';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GroupComponent } from './group/group.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginformComponent,
    RegisterformComponent,
    HomepageComponent,
    ProfileComponent,
    NavbarComponent,
    GroupComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    AppRoutingModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokeninterceptorInterceptor,
      multi: true
    },
    AuthServiceService,
    ApiService,
    UserService,
    ConfigService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
