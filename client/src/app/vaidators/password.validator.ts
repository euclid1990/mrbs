import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

interface ValidationResult {
    [key: string]: any;
}

@Injectable()
export class PasswordValidator {

    constructor() { }

    confirm(g: FormGroup): ValidationResult {
        let last = null, valid = true;
        let name: string;
        for (name in g.controls) {
            if (last !== g.controls[name].value && last !== null) {
                valid = false;
                break;
            }
            last = g.controls[name].value;
        }
        return valid ? null : { "passwordConfirm": true };
    }
}