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
var http_1 = require('@angular/http');
var Subject_1 = require('rxjs/Subject');
var config_1 = require('./../config/config');
var AuthService = (function () {
    function AuthService(http, config) {
        this.http = http;
        this.config = config;
        // Observable object sources
        this.authSource = new Subject_1.Subject();
        // Observable object streams
        this.auth$ = this.authSource.asObservable();
        var auth = JSON.parse(localStorage.getItem('auth'));
        if (auth) {
            this.user = auth.user;
            this.token = auth.token;
        }
    }
    AuthService.prototype.authenticated = function () {
        var auth = JSON.parse(localStorage.getItem('auth'));
        return auth ? true : false;
    };
    AuthService.prototype.store = function (user, token) {
        this.user = user;
        this.token = token;
        localStorage.setItem('auth', JSON.stringify({ user: this.user, token: token }));
        this.authSource.next({ user: this.user, token: token });
    };
    AuthService.prototype.destroy = function () {
        this.user = null;
        this.token = null;
        localStorage.removeItem('auth');
        this.authSource.next({ user: null, token: null });
    };
    AuthService.prototype.getToken = function () {
        return this.token;
    };
    AuthService.prototype.setToken = function (token) {
        this.store(this.user, token);
    };
    AuthService.prototype.getUser = function () {
        return this.user;
    };
    AuthService.prototype.setUser = function (user) {
        this.store(user, this.token);
    };
    AuthService.prototype.getHeaders = function () {
        var headers = new http_1.Headers({ Authorization: 'Bearer ' + this.token });
        return headers;
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, config_1.Config])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map