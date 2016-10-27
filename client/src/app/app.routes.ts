import { Routes } from '@angular/router';
import { DashboardRoutes } from './components/dashboard/dashboard.routes';
import { AuthRoutes } from './components/auth/auth.routes';
import { UserRoutes } from './components/user/user.routes';

export const routes: Routes = [
  ...DashboardRoutes,
  ...AuthRoutes,
  ...UserRoutes
];