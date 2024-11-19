import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    SignUpComponent,
    LoginComponent,
  ],
  
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
  ],
  
  exports: [
    SignUpComponent,
    LoginComponent, 
  ]
})
export class AuthModule { }
