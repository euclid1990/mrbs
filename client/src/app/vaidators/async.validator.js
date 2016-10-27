"use strict";
var Observable_1 = require('rxjs/Observable');
var DEBOUNCE_TIME = 500;
var AsyncValidator = (function () {
    function AsyncValidator(validator, debounceTime) {
        var _this = this;
        if (debounceTime === void 0) { debounceTime = DEBOUNCE_TIME; }
        var source = Observable_1.Observable.create(function (observer) {
            _this._validate = function (control) { return observer.next(control); };
        });
        source.debounceTime(debounceTime)
            .map(function (x) { return { promise: validator(x.control), resolver: x.promiseResolver }; })
            .subscribe(function (x) {
            x.promise.then(function (resultValue) { return x.resolver(resultValue); }, function (e) { console.log('Async validator error: %s', e); });
        });
    }
    AsyncValidator.prototype._getValidator = function () {
        var _this = this;
        return function (control) {
            var promiseResolver;
            var p = new Promise(function (resolve) {
                promiseResolver = resolve;
            });
            _this._validate({ control: control, promiseResolver: promiseResolver });
            return p;
        };
    };
    AsyncValidator.debounce = function (validator, debounceTime) {
        if (debounceTime === void 0) { debounceTime = DEBOUNCE_TIME; }
        var asyncValidator = new this(validator, debounceTime);
        // Return origin validator function
        return asyncValidator._getValidator();
    };
    return AsyncValidator;
}());
exports.AsyncValidator = AsyncValidator;
//# sourceMappingURL=async.validator.js.map