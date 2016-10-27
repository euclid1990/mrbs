import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Form, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Config } from './../../config/config';
import { AuthService } from './../../services/auth.service';
import { HelperService } from './../../services/helper.service';
import { PasswordValidator } from './../../vaidators/password.validator';
import { BetweenValidator } from './../../vaidators/between.validator';

@Component({
    moduleId: module.id,
    selector: 'div[name=user-password]',
    templateUrl: 'user-password.component.html',
    providers: [ PasswordValidator ]
})

export class UserPasswordComponent implements OnInit {
    public submitted: Boolean = false;
    public submitting: Boolean = false;
    public model: Object = { password_current: null, password: null, password_confirmation: null };
    public message: string;
    public errors: Object = {};
    public form: FormGroup;
    public formErrors = {
        init: function() {
            this.password_current = "";
            this.password = "";
            this.password_confirmation = "";
            this.passwords = "";
            return this;
        }
    }.init();

    public validationMessages = {
        password_current: {
            required: "Current password is required.",
        },
        password: {
            required: "New password is required.",
            between: "New password must be between 6 and 30 characters",
        },
        password_confirmation: {
            required: "New password confirmation is required.",
        },
        passwords: {
            passwordConfirm: "New password confirmation does not match.",
        },
    };

    constructor(private zone: NgZone,
        private router: Router,
        private http: Http,
        private config: Config,
        private fb: FormBuilder,
        private pv: PasswordValidator,
        private authSv: AuthService) {
    }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.form = this.fb.group({
            password_current: ['', Validators.required],
            passwords: this.fb.group({
                password: ['', Validators.compose([
                        Validators.required,
                        BetweenValidator(6, 30)
                    ])
                ],
                password_confirmation: ['', Validators.required]
            }, {validator: this.pv.confirm}),
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
            let headers = this.authSv.getHeaders();
            headers.append("Content-Type", "application/json");
            this.http.post(this.config.get("api.user.password"), body, {
                headers: headers
            })
            .map(res => res.json())
            .catch(this.handleError)
            .subscribe((response: any) => {
                if (response.status == 200) {
                    this.message = "1";
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

    goBack() {
        window.history.back();
    }

    get diagnostic() {
        return JSON.stringify(this.model);
    }
}