import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const DashboardRoutes: Route[] = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];