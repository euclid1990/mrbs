import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from './../../config/config';
import { AuthService } from './../../services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'div[name=logout]',
    templateUrl: 'logout.component.html',
})

export class LogoutComponent implements OnInit {

    constructor(private zone: NgZone,
        private router: Router,
        private config: Config,
        private authSv: AuthService) {
    }

    ngOnInit(): void {
        this.authSv.destroy();
        this.redirect();
    }

    redirect() {
        this.router.navigate(["/"]);
    }
}
