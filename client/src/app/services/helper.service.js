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
var forms_1 = require('@angular/forms');
var HelperService = (function () {
    function HelperService() {
    }
    HelperService.getValidateMessages = function (form, formErrors, validationMessages) {
        for (var field in formErrors) {
            var g = form.get(field);
            if (g instanceof forms_1.FormGroup) {
                for (var name_1 in g.controls) {
                    var control = g.controls[name_1];
                    if (control && control.dirty && !control.valid) {
                        var messages = validationMessages[name_1];
                        for (var key in control.errors) {
                            formErrors[name_1] = messages[key];
                        }
                    }
                }
            }
            if (g && g.dirty && !g.valid) {
                var messages = validationMessages[field];
                for (var key in g.errors) {
                    formErrors[field] = messages[key];
                }
            }
        }
        return formErrors;
    };
    HelperService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], HelperService);
    return HelperService;
}());
exports.HelperService = HelperService;
//# sourceMappingURL=helper.service.js.map