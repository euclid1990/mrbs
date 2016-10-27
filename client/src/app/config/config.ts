import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import './../rxjs-operators';
import * as _ from 'lodash';

@Injectable()
export class Config {

    private resources: Object = {
        api: "/app/config/api.json",
    };
    private _config: Object = {};

    constructor(private http: Http) { }

    load() {
        return new Promise((resolve, reject) => {
            let obs: Array<any> = [];
            for(let key in this.resources) {
                obs.push(this.http.get(this.resources[key])
                            .map(res => res.json())
                            .map(res => { let obj = {}; obj["key"] = key; obj["res"] = res; return obj }));
            }
            // Executing multiple concurrent HTTP requests
            let source = Observable.forkJoin(obs);
            source.catch((error: any) => {
                console.error(error);
                return Observable.throw(error.json().errors);
            })
            .subscribe((data) => {
                for (let d of data) {
                    this._config[d.key] = d.res;
                }
                resolve(true);
            });
        });
    }

    getConfig(): Object {
        return this._config;
    }

    get(key: any): any {
        return _.get(this._config, key);
    }

    /* Accessing nested JavaScript objects with string key */
    byString (o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        let a = s.split('.');
        for (let i = 0, n = a.length; i < n; ++i) {
          let k = a[i];
          if (k in o) {
              o = o[k];
          } else {
              return null;
          }
        }
        return o;
    }
};