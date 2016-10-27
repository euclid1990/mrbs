import { Injectable } from '@angular/core';
import { Form, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Injectable()
export class HelperService {
    static getValidateMessages(form: FormGroup, formErrors: Object, validationMessages: Object): Object {
        for (const field in formErrors) {
            let g = form.get(field);
            if (g instanceof FormGroup) {
                for(let name in g.controls) {
                    let control = g.controls[name];
                    if (control && control.dirty && !control.valid) {
                        const messages = validationMessages[name];
                        for (const key in control.errors) {
                            formErrors[name] = messages[key];
                        }
                    }
                }
            }
            if (g && g.dirty && !g.valid) {
                const messages = validationMessages[field];
                for (const key in g.errors) {
                    formErrors[field] = messages[key];
                }
            }
        }
        return formErrors;
    }
}