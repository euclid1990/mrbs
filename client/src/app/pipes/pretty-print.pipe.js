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
 * <div [innerHTML]="obj | prettyprint"></div>
 */
var PrettyPrintPipe = (function () {
    function PrettyPrintPipe() {
    }
    PrettyPrintPipe.prototype.transform = function (value) {
        return JSON.stringify(value, this.censor(value), 2)
            .replace(/ /g, '&nbsp;')
            .replace(/\n/g, '<br/>');
    };
    PrettyPrintPipe.prototype.censor = function (censor) {
        var i = 0;
        return function (key, value) {
            if (i !== 0 && typeof (censor) === 'object' && typeof (value) == 'object' && censor == value) {
                return '[Circular]';
            }
            // Seems to be a harded maximum of 100 serialized objects
            if (i >= 100) {
                return '[Unknown]';
            }
            // So we know we aren't using the original object anymore
            ++i;
            return value;
        };
    };
    PrettyPrintPipe = __decorate([
        core_1.Pipe({ name: 'prettyprint' }), 
        __metadata('design:paramtypes', [])
    ], PrettyPrintPipe);
    return PrettyPrintPipe;
}());
exports.PrettyPrintPipe = PrettyPrintPipe;
//# sourceMappingURL=pretty-print.pipe.js.map