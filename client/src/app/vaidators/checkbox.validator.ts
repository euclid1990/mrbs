import { Injectable } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

interface ValidationResult {
    [key: string]: any;
}

@Injectable()
export class CheckboxValidator {

    constructor() {}

    mustBeChecked(c: AbstractControl): ValidationResult {
        return c.value ? null : { "checkboxMustBeChecked": true };
    }
}