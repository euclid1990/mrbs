import { Injectable } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { Config } from './../config/config';
import './../rxjs-operators';

// General Email Regex (RFC 5322 Official Standard)
const EMAIL_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

interface ValidationResult {
    [key: string]: any;
}

@Injectable()
export class EmailValidator {
    private uniqueEmail: string;

    constructor(private http: Http, private config: Config) {
        // Email has already been taken
        this.uniqueEmail = this.config.get("api.validate.unique_email");
    }

    format(c: AbstractControl): ValidationResult {
        return EMAIL_REGEXP.test(c.value) ? null : { "emailFormat": true };
    }

    taken(c: AbstractControl): Promise<ValidationResult> {
        return new Promise((resolve, reject) => {
            let body = JSON.stringify({ email: c.value });
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            this.http.post(this.uniqueEmail, body, {
                headers: headers
            })
            .map(res => res.json())
            .catch(this.handleError)
            .subscribe((data) => {
                if (data.status == 200) {
                    resolve(null);
                } else {
                    resolve({ "emailTaken": true });
                };
            });
        });
    }

    private handleError(error: any) {
        return Observable.throw(error.json().errors);
    }
}