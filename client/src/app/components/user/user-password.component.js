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
var auth_service_1 = require('./../../services/auth.service');
var helper_service_1 = require('./../../services/helper.service');
var password_validator_1 = require('./../../vaidators/password.validator');
var between_validator_1 = require('./../../vaidators/between.validator');
var UserPasswordComponent = (function () {
    function UserPasswordComponent(zone, router, http, config, fb, pv, authSv) {
        this.zone = zone;
        this.router = router;
        this.http = http;
        this.config = config;
        this.fb = fb;
        this.pv = pv;
        this.authSv = authSv;
        this.submitted = false;
        this.submitting = false;
        this.model = { password_current: null, password: null, password_confirmation: null };
        this.errors = {};
        this.formErrors = {
            init: function () {
                this.password_current = "";
                this.password = "";
                this.password_confirmation = "";
                this.passwords = "";
                return this;
            }
        }.init();
        this.validationMessages = {
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
    }
    UserPasswordComponent.prototype.ngOnInit = function () {
        this.buildForm();
    };
    UserPasswordComponent.prototype.buildForm = function () {
        var _this = this;
        this.form = this.fb.group({
            password_current: ['', forms_1.Validators.required],
            passwords: this.fb.group({
                password: ['', forms_1.Validators.compose([
                        forms_1.Validators.required,
                        between_validator_1.BetweenValidator(6, 30)
                    ])
                ],
                password_confirmation: ['', forms_1.Validators.required]
            }, { validator: this.pv.confirm }),
        });
        this.form.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
    };
    UserPasswordComponent.prototype.onValueChanged = function (data) {
        if (!this.form) {
            return;
        }
        var form = this.form;
        // Clear previous error message (if any)
        this.formErrors.init();
        this.formErrors = helper_service_1.HelperService.getValidateMessages(form, this.formErrors, this.validationMessages);
    };
    UserPasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.form.valid) {
            var body = JSON.stringify(this.model);
            var headers = this.authSv.getHeaders();
            headers.append("Content-Type", "application/json");
            this.http.post(this.config.get("api.user.password"), body, {
                headers: headers
            })
                .map(function (res) { return res.json(); })
                .catch(this.handleError)
                .subscribe(function (response) {
                if (response.status == 200) {
                    _this.message = "1";
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
    UserPasswordComponent.prototype.handleError = function (error) {
        return Observable_1.Observable.create(function (observer) {
            observer.next({ status: 500, errors: {} });
            observer.complete();
        });
    };
    UserPasswordComponent.prototype.goBack = function () {
        window.history.back();
    };
    Object.defineProperty(UserPasswordComponent.prototype, "diagnostic", {
        get: function () {
            return JSON.stringify(this.model);
        },
        enumerable: true,
        configurable: true
    });
    UserPasswordComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'div[name=user-password]',
            templateUrl: 'user-password.component.html',
            providers: [password_validator_1.PasswordValidator]
        }), 
        __metadata('design:paramtypes', [core_1.NgZone, router_1.Router, http_1.Http, config_1.Config, forms_1.FormBuilder, password_validator_1.PasswordValidator, auth_service_1.AuthService])
    ], UserPasswordComponent);
    return UserPasswordComponent;
}());
exports.UserPasswordComponent = UserPasswordComponent;
//# sourceMappingURL=user-password.component.js.map