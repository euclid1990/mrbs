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
var auth_service_1 = require('./../../services/auth.service');
var helper_service_1 = require('./../../services/helper.service');
var LoginComponent = (function () {
    function LoginComponent(zone, router, http, config, fb, authSv) {
        this.zone = zone;
        this.router = router;
        this.http = http;
        this.config = config;
        this.fb = fb;
        this.authSv = authSv;
        this.submitted = false;
        this.submitting = false;
        this.model = new user_model_1.User(null, null, null, null, null, null, null);
        this.errors = {};
        this.formErrors = {
            init: function () {
                this.username = "";
                this.password = "";
                return this;
            }
        }.init();
        this.validationMessages = {
            username: {
                required: "Username/Email is required.",
            },
            password: {
                required: "Password is required.",
            },
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.buildForm();
    };
    LoginComponent.prototype.buildForm = function () {
        var _this = this;
        this.form = this.fb.group({
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
        this.form.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
    };
    LoginComponent.prototype.onValueChanged = function (data) {
        if (!this.form) {
            return;
        }
        var form = this.form;
        // Clear previous error message (if any)
        this.formErrors.init();
        this.formErrors = helper_service_1.HelperService.getValidateMessages(form, this.formErrors, this.validationMessages);
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.form.valid) {
            var body = JSON.stringify(this.model);
            var headers = new http_1.Headers();
            headers.append("Content-Type", "application/json");
            this.http.post(this.config.get("api.user.login"), body, {
                headers: headers
            })
                .map(function (res) { return res.json(); })
                .catch(this.handleError)
                .subscribe(function (response) {
                if (response.status == 200) {
                    _this.authSv.store(response.data.user, response.data.token);
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
    LoginComponent.prototype.handleError = function (error) {
        return Observable_1.Observable.create(function (observer) {
            observer.next({ status: 500, errors: {} });
            observer.complete();
        });
    };
    LoginComponent.prototype.redirect = function () {
        this.router.navigate(["/"]);
    };
    LoginComponent.prototype.goBack = function () {
        window.history.back();
    };
    Object.defineProperty(LoginComponent.prototype, "diagnostic", {
        get: function () {
            return JSON.stringify(this.model);
        },
        enumerable: true,
        configurable: true
    });
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'div[name=login]',
            templateUrl: 'login.component.html'
        }), 
        __metadata('design:paramtypes', [core_1.NgZone, router_1.Router, http_1.Http, config_1.Config, forms_1.FormBuilder, auth_service_1.AuthService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map