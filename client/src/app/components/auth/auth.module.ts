import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';

@NgModule({
    imports: [SharedModule],
    declarations: [RegisterComponent, LoginComponent, LogoutComponent],
    exports: [RegisterComponent, LoginComponent, LogoutComponent],
})
export class AuthModule { }