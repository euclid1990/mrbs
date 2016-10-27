import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
    public user: Object = null;

    constructor(private authSv: AuthService) {
    }

    ngOnInit() {
        this.user = this.authSv.getUser();
        this.authSv.auth$.subscribe((info: any) => {
            this.user = info.user;
        });
    }
}
