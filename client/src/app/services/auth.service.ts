import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Config } from './../config/config';

@Injectable()
export class AuthService {
    public user: any;
    public token: string;
    // Observable object sources
    public authSource = new Subject<Object>();
    // Observable object streams
    public auth$ = this.authSource.asObservable();

    constructor(private http: Http,
        private config: Config) {
        var auth = JSON.parse(localStorage.getItem('auth'));
        if (auth) {
            this.user = auth.user;
            this.token = auth.token;
        }
    }

    authenticated() {
        var auth = JSON.parse(localStorage.getItem('auth'));
        return auth ? true : false;
    }

    store(user: any, token: string) {
        this.user = user;
        this.token = token;
        localStorage.setItem('auth', JSON.stringify({ user: this.user, token: token }));
        this.authSource.next({ user: this.user, token: token });
    }

    destroy() {
        this.user = null;
        this.token = null;
        localStorage.removeItem('auth');
        this.authSource.next({ user: null, token: null });
    }

    getToken() {
        return this.token;
    }

    setToken(token: string) {
        this.store(this.user, token);
    }

    getUser() {
        return this.user;
    }

    setUser(user: any) {
       this.store(user, this.token);
    }

    getHeaders() {
        let headers = new Headers({ Authorization: 'Bearer ' + this.token });
        return headers;
    }

}