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
/**
 * Print Object in View
 * Example:
 * <div *ngFor='elm of obj | objecttoarray:"key":true'></div>
 */
var ObjectToArrayPipe = (function () {
    function ObjectToArrayPipe() {
    }
    ObjectToArrayPipe.prototype.transform = function (value, keyName, isSort) {
        if (isSort === void 0) { isSort = false; }
        var keyArr = Object.keys(value), dataArr = [];
        keyArr.forEach(function (key) {
            value[key][keyName] = key;
            dataArr.push(value[key]);
        });
        if (isSort) {
            dataArr.sort(function (a, b) {
                return a[keyName] > b[keyName] ? 1 : -1;
            });
        }
        console.log(dataArr);
        return dataArr;
    };
    ObjectToArrayPipe = __decorate([
        core_1.Pipe({ name: 'objecttoarray' }), 
        __metadata('design:paramtypes', [])
    ], ObjectToArrayPipe);
    return ObjectToArrayPipe;
}());
exports.ObjectToArrayPipe = ObjectToArrayPipe;
//# sourceMappingURL=object-to-array.pipe.js.map