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
var Observable_1 = require('rxjs/Observable');
var http_1 = require('@angular/http');
var config_1 = require('./../config/config');
require('./../rxjs-operators');
// General Email Regex (RFC 5322 Official Standard)
var EMAIL_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
var EmailValidator = (function () {
    function EmailValidator(http, config) {
        this.http = http;
        this.config = config;
        // Email has already been taken
        this.uniqueEmail = this.config.get("api.validate.unique_email");
    }
    EmailValidator.prototype.format = function (c) {
        return EMAIL_REGEXP.test(c.value) ? null : { "emailFormat": true };
    };
    EmailValidator.prototype.taken = function (c) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var body = JSON.stringify({ email: c.value });
            var headers = new http_1.Headers();
            headers.append("Content-Type", "application/json");
            _this.http.post(_this.uniqueEmail, body, {
                headers: headers
            })
                .map(function (res) { return res.json(); })
                .catch(_this.handleError)
                .subscribe(function (data) {
                if (data.status == 200) {
                    resolve(null);
                }
                else {
                    resolve({ "emailTaken": true });
                }
                ;
            });
        });
    };
    EmailValidator.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error.json().errors);
    };
    EmailValidator = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, config_1.Config])
    ], EmailValidator);
    return EmailValidator;
}());
exports.EmailValidator = EmailValidator;
//# sourceMappingURL=email.validator.js.map