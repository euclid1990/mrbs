import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Form, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Config } from './../../config/config';
import { User, Gender, GENDERS } from './../../models/user.model';
import { HelperService } from './../../services/helper.service';
import { AsyncValidator } from './../../vaidators/async.validator';
import { EmailValidator } from './../../vaidators/email.validator';
import { PasswordValidator } from './../../vaidators/password.validator';
import { CheckboxValidator } from './../../vaidators/checkbox.validator';
import { BetweenValidator } from './../../vaidators/between.validator';

@Component({
    moduleId: module.id,
    selector: 'div[name=register]',
    templateUrl: 'register.component.html',
    providers: [EmailValidator, PasswordValidator, CheckboxValidator]
})

export class RegisterComponent implements OnInit {
    public submitted: Boolean = false;
    public submitting: Boolean = false;
    public second: number = 4;
    public genders: Array<Gender> = GENDERS;
    public model: User = new User(null, null, null, null, null, null, null);
    public errors: Object = {};
    public form: FormGroup;
    public formErrors = {
        init: function() {
            this.name = "";
            this.gender = "";
            this.email = "";
            this.password = "";
            this.password_confirmation = "";
            this.passwords = "";
            this.agreed = "";
            return this;
        }
    }.init();

    public validationMessages = {
        name: {
            required: "Name is required.",
            minlength: "Name must be at least 3 characters long.",
            maxlength: "Name cannot be more than 50 characters long.",
        },
        email: {
            required: "Email is required.",
            emailFormat: "Email is invalid format",
            emailTaken: "Email has already been taken",
        },
        password: {
            required: "Password is required.",
            between: "Password must be between 6 and 30 characters",
        },
        password_confirmation: {
            required: "Password confirmation is required.",
        },
        passwords: {
            passwordConfirm: "Password confirmation does not match.",
        },
        agreed: {
            checkboxMustBeChecked: "You must agree to the terms of use.",
        }
    };

    constructor(private zone: NgZone,
        private router: Router,
        private http: Http,
        private config: Config,
        private fb: FormBuilder,
        private ev: EmailValidator,
        private pv: PasswordValidator,
        private cbv: CheckboxValidator) {
    }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.form = this.fb.group({
            name: ['', Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(50)
                ])
            ],
            gender: ['', Validators.required],
            email: ['', Validators.compose([
                    Validators.required,
                    this.ev.format
                ]),
                AsyncValidator.debounce(this.ev.taken.bind(this.ev))
            ],
            passwords: this.fb.group({
                password: ['', Validators.compose([
                        Validators.required,
                        BetweenValidator(6, 30)
                    ])
                ],
                password_confirmation: ['', Validators.required]
            }, {validator: this.pv.confirm}),
            agreed: [true, this.cbv.mustBeChecked],
        });

        this.form.valueChanges.subscribe(data => this.onValueChanged(data));

        // this.form.get("email").statusChanges.subscribe(data => this.onStatusChanged(data));

        this.model.agreed = true;
    }

    onStatusChanged(data?: any) {
        if (data == "INVALID" || data == "VALID") {
            this.onValueChanged();
        }
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
            //this.zone.run(() => {
            let body = JSON.stringify(this.model);
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            this.http.post(this.config.get("api.user.store"), body, {
                headers: headers
            })
            .map(res => res.json())
            .catch(this.handleError)
            .subscribe((response: any) => {
                if (response.status == 200) {
                    this.redirect();
                    this.submitted = true;
                } else {
                    this.errors = response.errors;
                    this.submitting = false;
                };
            });
            this.submitting = true;
            //});
        }
    }

    private handleError(error: any) {
        return Observable.create(function (observer) {
            observer.next({ status: 500, errors: {} });
            observer.complete();
        });
    }

    redirect() {
        this.second -= 1;
        if (this.second >= 0) {
            window.setTimeout(() => this.redirect(), 1000);
        } else {
            this.router.navigate(["login"]);
        }
    }

    goBack() {
        window.history.back();
    }

    get diagnostic() {
        return JSON.stringify(this.model);
    }
}