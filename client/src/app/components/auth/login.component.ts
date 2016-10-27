import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Form, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Config } from './../../config/config';
import { User } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';
import { HelperService } from './../../services/helper.service';

@Component({
    moduleId: module.id,
    selector: 'div[name=login]',
    templateUrl: 'login.component.html'
})

export class LoginComponent  implements OnInit {
    public submitted: Boolean = false;
    public submitting: Boolean = false;
    public model: User = new User(null, null, null, null, null, null, null);
    public errors: Object = {};
    public form: FormGroup;
    public formErrors = {
        init: function() {
            this.username = "";
            this.password = "";
            return this;
        }
    }.init();
    public validationMessages = {
        username: {
            required: "Username/Email is required.",
        },
        password: {
            required: "Password is required.",
        },
    };

    constructor(private zone: NgZone,
        private router: Router,
        private http: Http,
        private config: Config,
        private fb: FormBuilder,
        private authSv: AuthService) {
    }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.form.valueChanges.subscribe(data => this.onValueChanged(data));
    }

    onValueChanged(data?: any) {
        if (!this.form) { return; }
        const form = this.form;
        // Clear previous error message (if any)
        this.formErrors.init();
        this.formErrors = HelperService.getValidateMessages(form, this.formErrors, this.validationMessages);
    }

    onSubmit() {
        if (this.form.valid) {
            let body = JSON.stringify(this.model);
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            this.http.post(this.config.get("api.user.login"), body, {
                headers: headers
            })
            .map(res => res.json())
            .catch(this.handleError)
            .subscribe((response: any) => {
                if (response.status == 200) {
                    this.authSv.store(response.data.user, response.data.token);
                    this.redirect();
                    this.submitted = true;
                } else {
                    this.errors = response.errors;
                    this.submitting = false;
                };
            });
            this.submitting = true;
        }
    }

    private handleError(error: any) {
        return Observable.create(function (observer) {
            observer.next({ status: 500, errors: {} });
            observer.complete();
        });
    }

    redirect() {
        this.router.navigate(["/"]);
    }

    goBack() {
        window.history.back();
    }

    get diagnostic() {
        return JSON.stringify(this.model);
    }
}