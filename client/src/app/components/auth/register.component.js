"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var Observable_1 = require('rxjs/Observable');
var config_1 = require('./../../config/config');
var user_model_1 = require('./../../models/user.model');
var helper_service_1 = require('./../../services/helper.service');
var async_validator_1 = require('./../../vaidators/async.validator');
var email_validator_1 = require('./../../vaidators/email.validator');
var password_validator_1 = require('./../../vaidators/password.validator');
var checkbox_validator_1 = require('./../../vaidators/checkbox.validator');
var between_validator_1 = require('./../../vaidators/between.validator');
var RegisterComponent = (function () {
    function RegisterComponent(zone, router, http, config, fb, ev, pv, cbv) {
        this.zone = zone;
        this.router = router;
        this.http = http;
        this.config = config;
        this.fb = fb;
        this.ev = ev;
        this.pv = pv;
        this.cbv = cbv;
        this.submitted = false;
        this.submitting = false;
        this.second = 4;
        this.genders = user_model_1.GENDERS;
        this.model = new user_model_1.User(null, null, null, null, null, null, null);
        this.errors = {};
        this.formErrors = {
            init: function () {
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
        this.validationMessages = {
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
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.buildForm();
    };
    RegisterComponent.prototype.buildForm = function () {
        var _this = this;
        this.form = this.fb.group({
            name: ['', forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(3),
                    forms_1.Validators.maxLength(50)
                ])
            ],
            gender: ['', forms_1.Validators.required],
            email: ['', forms_1.Validators.compose([
                    forms_1.Validators.required,
                    this.ev.format
                ]),
                async_validator_1.AsyncValidator.debounce(this.ev.taken.bind(this.ev))
            ],
            passwords: this.fb.group({
                password: ['', forms_1.Validators.compose([
                        forms_1.Validators.required,
                        between_validator_1.BetweenValidator(6, 30)
                    ])
                ],
                password_confirmation: ['', forms_1.Validators.required]
            }, { validator: this.pv.confirm }),
            agreed: [true, this.cbv.mustBeChecked],
        });
        this.form.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        // this.form.get("email").statusChanges.subscribe(data => this.onStatusChanged(data));
        this.model.agreed = true;
    };
    RegisterComponent.prototype.onStatusChanged = function (data) {
        if (data == "INVALID" || data == "VALID") {
            this.onValueChanged();
        }
    };
    RegisterComponent.prototype.onValueChanged = function (data) {
        if (!this.form) {
            return;
        }
        var form = this.form;
        // Clear previous error message (if any)
        this.formErrors.init();
        this.formErrors = helper_service_1.HelperService.getValidateMessages(form, this.formErrors, this.validationMessages);
    };
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.form.valid) {
            //this.zone.run(() => {
            var body = JSON.stringify(this.model);
            var headers = new http_1.Headers();
            headers.append("Content-Type", "application/json");
            this.http.post(this.config.get("api.user.store"), body, {
                headers: headers
            })
                .map(function (res) { return res.json(); })
                .catch(this.handleError)
                .subscribe(function (response) {
                if (response.status == 200) {
                    _this.redirect();
                    _this.submitted = true;
                }
                else {
                    _this.errors = response.errors;
                    _this.submitting = false;
                }
                ;
            });
            this.submitting = true;
        }
    };
    RegisterComponent.prototype.handleError = function (error) {
        return Observable_1.Observable.create(function (observer) {
            observer.next({ status: 500, errors: {} });
            observer.complete();
        });
    };
    RegisterComponent.prototype.redirect = function () {
        var _this = this;
        this.second -= 1;
        if (this.second >= 0) {
            window.setTimeout(function () { return _this.redirect(); }, 1000);
        }
        else {
            this.router.navigate(["login"]);
        }
    };
    RegisterComponent.prototype.goBack = function () {
        window.history.back();
    };
    Object.defineProperty(RegisterComponent.prototype, "diagnostic", {
        get: function () {
            return JSON.stringify(this.model);
        },
        enumerable: true,
        configurable: true
    });
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'div[name=register]',
            templateUrl: 'register.component.html',
            providers: [email_validator_1.EmailValidator, password_validator_1.PasswordValidator, checkbox_validator_1.CheckboxValidator]
        }), 
        __metadata('design:paramtypes', [core_1.NgZone, router_1.Router, http_1.Http, config_1.Config, forms_1.FormBuilder, email_validator_1.EmailValidator, password_validator_1.PasswordValidator, checkbox_validator_1.CheckboxValidator])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map