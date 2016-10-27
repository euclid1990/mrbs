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
require('./../rxjs-operators');
var _ = require('lodash');
var Config = (function () {
    function Config(http) {
        this.http = http;
        this.resources = {
            api: "/app/config/api.json",
        };
        this._config = {};
    }
    Config.prototype.load = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var obs = [];
            var _loop_1 = function(key) {
                obs.push(_this.http.get(_this.resources[key])
                    .map(function (res) { return res.json(); })
                    .map(function (res) { var obj = {}; obj["key"] = key; obj["res"] = res; return obj; }));
            };
            for (var key in _this.resources) {
                _loop_1(key);
            }
            // Executing multiple concurrent HTTP requests
            var source = Observable_1.Observable.forkJoin(obs);
            source.catch(function (error) {
                console.error(error);
                return Observable_1.Observable.throw(error.json().errors);
            })
                .subscribe(function (data) {
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var d = data_1[_i];
                    _this._config[d.key] = d.res;
                }
                resolve(true);
            });
        });
    };
    Config.prototype.getConfig = function () {
        return this._config;
    };
    Config.prototype.get = function (key) {
        return _.get(this._config, key);
    };
    /* Accessing nested JavaScript objects with string key */
    Config.prototype.byString = function (o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, ''); // strip a leading dot
        var a = s.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (k in o) {
                o = o[k];
            }
            else {
                return null;
            }
        }
        return o;
    };
    Config = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Config);
    return Config;
}());
exports.Config = Config;
;
//# sourceMappingURL=config.js.map