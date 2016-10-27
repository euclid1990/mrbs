import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SharedModule } from './shared.module';
import { AuthModule } from './components/auth/auth.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { UserModule } from './components/user/user.module';
import { routes } from './app.routes';

@NgModule({
  imports:      [ BrowserModule, SharedModule.forRoot(), RouterModule.forRoot(routes),
                  AuthModule, DashboardModule, UserModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
