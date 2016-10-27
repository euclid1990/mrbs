import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule }   from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { UserDetailComponent } from './user-detail.component';
import { UserPasswordComponent } from './user-password.component';

@NgModule({
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  declarations: [UserDetailComponent, UserPasswordComponent],
  exports: [UserDetailComponent, UserPasswordComponent]
})
export class UserModule { }