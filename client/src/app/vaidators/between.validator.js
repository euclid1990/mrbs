"use strict";
var forms_1 = require('@angular/forms');
function isPresent(obj) {
    return obj !== undefined && obj !== null;
}
function BetweenValidator(min, max) {
    return function (control) {
        if (isPresent(forms_1.Validators.required(control))) {
            return null;
        }
        var str = control.value;
        var no = (str !== null) && (min <= str.length) && (str.length <= max);
        return no ? null : { "between": true };
    };
}
exports.BetweenValidator = BetweenValidator;
//# sourceMappingURL=between.validator.js.map