/**
 * AuthPlz API Wrapper Library
 * Helpers to simplify writing frontends for the AuthPlz service
 */

// import u2f from './u2f-api';
import 'whatwg-fetch';
import { REACT_APP_API_SERVER } from './const';

// AuthPlz API interface class
class AuthPlzApi {
    base = REACT_APP_API_SERVER || '';
    credentials = 'include';

    GetJson(path, params) {
        const queryParams = new URLSearchParams(params);
        const queryString = `${this.base}${path}${queryParams.toString()}`

        return fetch(queryString, {
                method: 'get',
                credentials: this.credentials,
            })
            .then(res => {
                if (!res.ok) {
                    throw res.statusText;
                }
                return res.json();
            });
    }

    // API get helper
    GetApi(path, params) {
        let queryData = '?';
        Object.keys(params).forEach((i) => {
            queryData += `${i}=${params[i]}`;
        });
        return new Promise((resolve, reject) => {
            // Call fetch
            fetch(this.base + path + queryData, {
                method: 'get',
                credentials: this.credentials,
            }).then(res => res.json())
                .then((data) => {
                    if (data.result === 'ok') {
                        resolve(data.message);
                    } else {
                        reject(data.message);
                    }
                }, (err) => {
                    console.log(`Failed to get from: ${this.base}${path} error: ${err}`);
                    reject('Communication error or bad request');
                });
        });
    }

    // API post helper
    PostForm(path, data) {
        const formData = new FormData();
        Object.keys(data).forEach((i) => {
            formData.append(i, data[i]);
        });

        return new Promise((resolve, reject) => {
            // Call fetch
            fetch(this.base + path, {
                method: 'post',
                credentials: this.credentials,
                body: formData,
            }).then(res => res.json())
                .then((res) => {
                    if (res.result === 'ok') {
                        resolve(res);
                    } else {
                        reject(res);
                    }
                }, () => {
                    console.log(`Failed to post to: ${this.base}${path}`);
                    reject('Communication error or bad request');
                });
        });
    }

    PostJson(path, data) {
        return new Promise((resolve, reject) => {
            fetch(this.base + path, {
                method: 'post',
                credentials: this.credentials,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(res => res.json())
                .then((response) => {
                    if (typeof response.result !== 'undefined') {
                        if (response.result === 'ok') {
                            resolve(response.message);
                        } else {
                            reject(response.message);
                        }
                    } else {
                        resolve(response);
                    }
                }, () => {
                    console.log(`Failed to post to: ${this.base}${path}`);
                    reject('Communication error or bad request');
                });
        });
    }

    Status() {
        return this.GetApi('/api/status');
    }

    CreateUser(email, username, password) {
        return this.PostForm('/api/create', { username, email, password });
    }

    Login(email, password) {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        return new Promise((resolve, reject) => {
            // Call fetch
            fetch('/api/login', {
                method: 'post',
                credentials: this.credentials,
                body: formData,
            })
                .then((resp) => {
                    const response = resp;
                    console.log('Login response');
                    console.log(resp);

                    // 200 is ok, 202 returns available 2fa methods
                    if ((resp.status === 200) || (resp.status === 202)) {
                        return resp.json().then((data) => {
                            response.data = data;
                            resolve(response);
                        });
                    }
                    if (resp.status === 400) {
                        return reject('Bad request');
                    }
                    if (resp.status === 401) {
                        return reject('Email or password error');
                    }

                    return reject('Unknown login error');
                }, (err) => {
                    console.log('Login error');
                    console.log(err);
                    reject('Communication error or bad request');
                });
        });
    }

    Account() {
        return this.GetJson('/api/account');
    }

    PasswordReset(oldPass, newPass) {
        return this.GetJson('/api/u2f/enrol', { old_password: oldPass, new_password: newPass });
    }

    AccountRecovery(email) {
        return this.GetJson('/api/recovery', { email });
    }

    // 2FA things

    // Fetch a U2F token enrolment challenge
    GetU2FTokenEnrolment(name) {
        return this.GetJson('/api/u2f/enrol', { name });
    }

    // Post a U2F token enrolment response
    PostU2FTokenEnrolment(resp) {
        return this.PostJson('/api/u2f/enrol', resp);
    }

    // Fetch a U2F token authorization challenge
    GetU2FTokenAuthorize() {
        return this.GetJson('/api/u2f/authenticate');
    }

    // Post a U2F token authorization response
    PostU2FTokenAuthorize(resp) {
        return this.PostJson('/api/u2f/authenticate', resp);
    }

    // Fetch a TOTP enrolment challenge
    GetTOTPTokenEnrolment(name) {
        return this.GetJson('/api/totp/enrol', { name });
    }

    // Post a TOTP enrolment response (code generated from challenge secret)
    PostTOTPTokenEnrolment(code) {
        return this.PostJson('/api/totp/enrol', { code });
    }

    // Post a TOTP authorization
    PostTOTPTokenAuthorize(code) {
        return this.PostJson('/api/totp/authorize', { code });
    }

    // Post a backup code authorization
    PostBackupCodeAuthorize(code) {
        return this.PostJson('/api/backupcode/authorize', { code });
    }

    // OAuth things

    // Fetch OAuth client options
    GetOAuthOptions() {
        return this.GetJson('/api/oauth/options');
    }

    // Post a response to an authorization request
    CreateOauthClient(name, url, scopes, grants, responses) {
        return this.PostJson('/api/oauth/clients', {
            name,
            redirects: [url],
            scopes,
            grant_types: grants,
            response_types: responses,
        });
    }

    // Fetch a pending OAuth authorization
    GetPendingAuthorization() {
        return this.GetJson('/api/oauth/pending');
    }

    // Post a response to an authorization request
    PostAuthorizationAccept(accept, oauthStateString, scopes) {
        return this.PostJson('/api/oauth/auth', {
            accept,
            state: oauthStateString,
            granted_scopes: scopes
        });
    }
}

const AuthPlz = new AuthPlzApi();

export default AuthPlz;
