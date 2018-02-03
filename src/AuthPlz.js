/**
 * AuthPlz API Wrapper Library
 * Helpers to simplify writing frontends for the AuthPlz service
 */

// import u2f from './u2f-api';
import 'whatwg-fetch';
import { REACT_APP_API_SERVER } from './const';

const base = REACT_APP_API_SERVER || '';
const credentials = 'include';


const getJson = (path, params) => {
    const queryParams = new URLSearchParams(params);
    const queryString = `${base}${path}${queryParams.toString()}`

    return fetch(queryString, {
            method: 'get',
            credentials: credentials,
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return res
                .json()
                .then(res => {
                    throw res.code || 'UnkownError';
                });
        });
}

const getApi = (path, params) => {
    let queryData = '?';
    Object.keys(params).forEach((i) => {
        queryData += `${i}=${params[i]}`;
    });
    return new Promise((resolve, reject) => {
        // Call fetch
        fetch(base + path + queryData, {
            method: 'get',
            credentials: credentials,
        }).then(res => res.json())
            .then((data) => {
                if (data.result === 'ok') {
                    resolve(data.message);
                } else {
                    reject(data.message);
                }
            }, (err) => {
                console.log(`Failed to get from: ${base}${path} error: ${err}`);
                reject('Communication error or bad request');
            });
    });
}

const postForm = (path, data) => {
        const formData = new FormData();
        console.log(data);
        Object.keys(data).forEach((i) => {
            formData.append(i, data[i]);
        });

        return fetch(`${base}${path}`, {
            method: 'post',
            credentials: credentials,
            body: formData,
        }).then(res => {
            if (!res.ok) {
                throw res.statusText;
            }
            return res.json();
        }).then(response => {
            if (response.code != null) {
                throw response.code;
            }
            return response;
        });
    }

const postJson = (path, data) => {
    return new Promise((resolve, reject) => {
        fetch(base + path, {
            method: 'post',
            credentials: credentials,
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
                console.log(`Failed to post to: ${base}${path}`);
                reject('Communication error or bad request');
            });
    });
}

const status = () => getApi('/api/status');

const createUser = ({ email, username, password }) =>
    postForm('/api/create', { username, email, password });

const login = ({ email, password }) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return fetch(`${base}/api/login`, {
        method: 'post',
        credentials: credentials,
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            return response.json().then(data => ({
                ...response,
                data,
                isTwoFactor: response.status === 202
            }));
        }
        return response
            .json().then(data => {
            throw data.code || 'UNKNOWN_ERROR'
        });
        // if (response.status === 400) {
        //     return reject('Bad request');
        // }
        // if (response.status === 401) {
        //     return reject('Email or password error');
        // }

        // return reject('Unknown login error');
    });
}

const logout = () =>
    fetch(`${base}/api/logout`, {
        method: 'post',
        credentials: credentials,
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw response.json().then(data => data.code || 'UNKNOWN_ERROR');
    });

const account = () =>
    getJson('/api/account');

const passwordReset = (oldPass, newPass) =>
    getJson('/api/u2f/enrol', { old_password: oldPass, new_password: newPass });

const accountRecovery = (email) =>
    getJson('/api/recovery', { email });

    // 2FA things

    // Fetch a U2F token enrolment challenge
const getU2FTokenEnrolment = (name) =>
    getJson('/api/u2f/enrol', { name });

    // Post a U2F token enrolment response
const postU2FTokenEnrolment = (resp) =>
    postJson('/api/u2f/enrol', resp);

    // Fetch a U2F token authorization challenge
const getU2FTokenAuthorize = () =>
    getJson('/api/u2f/authenticate');

    // Post a U2F token authorization response
const postU2FTokenAuthorize = (resp) =>
    postJson('/api/u2f/authenticate', resp);

    // Fetch a TOTP enrolment challenge
const getTOTPTokenEnrolment = (name) =>
    getJson('/api/totp/enrol', { name });

    // Post a TOTP enrolment response (code generated from challenge secret)
const postTOTPTokenEnrolment = (code) =>
    postJson('/api/totp/enrol', { code });

    // Post a TOTP authorization
const PostTOTPTokenAuthorize = (code) =>
    postJson('/api/totp/authorize', { code });

    // Post a backup code authorization
const postBackupCodeAuthorize = (code) =>
    postJson('/api/backupcode/authorize', { code });

    // OAuth things

    // Fetch OAuth client options
const getOAuthOptions = () =>
    getJson('/api/oauth/options');

    // Post a response to an authorization request
const createOauthClient = (name, url, scopes, grants, responses) =>
    postJson('/api/oauth/clients', {
        name,
        redirects: [url],
        scopes,
        grant_types: grants,
        response_types: responses,
    });

    // Fetch a pending OAuth authorization
const getPendingAuthorization = () =>
    getJson('/api/oauth/pending');

    // Post a response to an authorization request
const postAuthorizationAccept = (accept, oauthStateString, scopes) =>
    postJson('/api/oauth/auth', {
        accept,
        state: oauthStateString,
        granted_scopes: scopes
    });

export {
    getJson,
    getApi,
    postForm,
    postJson,
    status,
    createUser,
    login,
    logout,
    account,
    passwordReset,
    accountRecovery,
    getU2FTokenEnrolment,
    postU2FTokenEnrolment,
    getU2FTokenAuthorize,
    postU2FTokenAuthorize,
    getTOTPTokenEnrolment,
    postTOTPTokenEnrolment,
    PostTOTPTokenAuthorize,
    postBackupCodeAuthorize,
    getOAuthOptions,
    createOauthClient,
    getPendingAuthorization,
    postAuthorizationAccept,
};
