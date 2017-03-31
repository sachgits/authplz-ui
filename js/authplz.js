'use strict';

import u2f from './u2f-api.js';

// AuthPlz API interface class
class AuthPlzApi {
    constructor() {

    }

    GetJson(path, params) {
        var queryData = "?"
        for(let i in params) {
            queryData += i + "=" + params[i]
        }
        return new Promise((resolve, reject) => {
            // Call fetch
            fetch(path + queryData, {
                method: 'get',
                credentials: 'same-origin',
            }).then((res) => { return res.json(); })
            .then((data) => {
                resolve(data)
            }, (err) => {
                console.log("Failed to get from: " + path + " error: " + err)
                reject("Communication error or bad request")
            })  
        })
    }

    // API get helper
    GetApi(path, params) {
        var queryData = "?"
        for(let i in params) {
            queryData += i + "=" + params[i]
        }
        return new Promise((resolve, reject) => {
            // Call fetch
            fetch(path + queryData, {
                method: 'get',
                credentials: 'same-origin',
            }).then((res) => { return res.json(); })
            .then((data) => {
                if(data.result === "ok") {
                    resolve(data.message)
                } else {
                    reject(data.message)
                }
            }, (err) => {
                console.log("Failed to get from: " + path + " error: " + err)
                reject("Communication error or bad request")
            })  
        })
    }

    // API post helper
    PostForm(path, data) {
        var formData = new FormData();
        for(let i in data) {
            formData.append(i, data[i]);
        }

        return new Promise((resolve, reject) => {
            // Call fetch
            fetch(path, {
                method: 'post',
                credentials: 'same-origin',
                body: formData
            }).then((res) => { 
                return res.json();
            })
            .then((data) => {
                if(data.result === "ok") {
                    resolve(data)
                } else {
                    reject(data)
                }
            }, (err) => {
                console.log("Failed to post to: " + path)
                reject("Communication error or bad request")
            })  
        })
    }

    PostJson(path, data) {
        return new Promise((resolve, reject) => {
            fetch(path, {
                method: 'post',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              }).then((res) => { 
                return res.json();
            })
            .then((data) => {
                if(data.result === "ok") {
                    resolve(data.message)
                } else {
                    reject(data.message)
                }
            }, (err) => {
                console.log("Failed to post to: " + path)
                reject("Communication error or bad request")
            }) 
        }) 
    }

    HandleError(resp, reject) {
        if(resp.status == 400) {
            return reject("Bad request")
        }
        if(resp.status == 401) {
            return reject("Unauthorized")
        }

    }

    Status() {
        return this.GetApi('/api/status')
    }

    CreateUser(username, email, password) {
        return this.PostForm('/api/create', {username: username, email: email, password: password})
    }

    Login(email, password) {
        var formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        return new Promise((resolve, reject) => {
            // Call fetch
            fetch('/api/login', {
                method: 'post',
                credentials: 'same-origin',
                body: formData
            })
            .then((resp) => {
                // 200 is ok, 202 returns available 2fa methods
                if((resp.status == 200) || (resp.status == 202)) {
                    return resp.json().then((data) => {
                        resp.data = data;
                        resolve(resp)
                    })
                }
                if(resp == 400) {
                    return reject("Bad request")
                }
                if(resp == 401) {
                    return reject("Username or password error")
                }
                
            }, (err) => {
                console.log(err)
                reject("Communication error or bad request")
            })  
        })
    }

    Account() {
        return this.GetJson('/api/account')
    }

    PasswordReset(old_pass, new_pass) {
        return this.GetJson('/api/u2f/enrol', {old_password: old_pass, new_password: new_pass})
    }

    AccountRecovery(email) {
        return this.GetJson('/api/recovery', {email: email})
    }

    // 2FA things

    // Fetch a U2F token enrolment challenge
    GetU2FTokenEnrolment(name) {
        return this.GetJson('/api/u2f/enrol', {name: name})
    }

    // Post a U2F token enrolment response
    PostU2FTokenEnrolment(resp) {
        return this.PostJson('/api/u2f/enrol', resp)
    }

    // Fetch a U2F token authorization challenge
    GetU2FTokenAuthorize(name) {
        return this.GetJson('/api/u2f/authorize', {name: name})
    }

    // Post a U2F token authorization response
    PostU2FTokenAuthorize(resp) {
        return this.PostJson('/api/u2f/authorize', resp)
    }

    // Fetch a TOTP enrolment challenge
    GetTOTPTokenEnrolment(name) {
        return this.GetJson('/api/totp/enrol', {name: name})
    }

    // Post a TOTP enrolment response (code generated from challenge secret)
    PostTOTPTokenEnrolment(code) {
        return this.PostJson('/api/totp/enrol', {code: code})
    }

    // Post a TOTP authorization
    PostTOTPTokenAuthorize(code) {
        return this.PostJson('/api/totp/authorize', resp)
    }

    // Post a backup code authorization
    PostBackupCodeAuthorize(code) {
        return this.PostJson('/api/backupcode/authorize', resp)
    }

    // OAuth things

    // Fetch a pending OAuth authorization
    GetPendingAuthorization() {
        return this.GetJson('/api/oauth/pending', {})
    }

    // Post a response to an authorization request
     PostAuthorizationAccept(accept, state, scopes) {
        return this.PostJson('/api/oauth/auth', {accept: accept, state: state, scopes: scopes})
    }

}

const AuthPlz = new AuthPlzApi()
export {AuthPlz, AuthPlzApi}

