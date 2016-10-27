import { Route } from '@angular/router';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';

export const AuthRoutes: Route[] = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  }
];