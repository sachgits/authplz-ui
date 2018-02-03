import {
    getApi,
    getJson,
    postForm,
    postJson,
    credentials,
    baseUrl
} from './helpers';

const status = () => getApi('/api/status');

const createUser = ({ email, username, password }) =>
    postForm('/api/create', { username, email, password });

const login = ({ email, password }) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return fetch(`${baseUrl}/api/login`, {
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
    });
}

const logout = () =>
    fetch(`${baseUrl}/api/logout`, {
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
    postForm('/api/recovery', { email: encodeURI(email) });

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
