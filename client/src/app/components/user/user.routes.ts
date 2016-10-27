import { Route } from '@angular/router';
import { UserDetailComponent } from './user-detail.component';
import { UserPasswordComponent } from './user-password.component';

export const UserRoutes: Route[] = [
    {
        path: 'user/detail',
        component: UserDetailComponent
    },
    {
        path: 'user/password',
        component: UserPasswordComponent
    }
];