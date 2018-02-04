import React from 'react';
import ReactDOM from 'react-dom';

import { IntlProvider } from 'react-intl';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { Link } from 'react-router-dom';

import { logout } from './api/AuthPlz';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import messages from './lang/en-nz';

const history = createBrowserHistory();

const buttonGroupClassName = 'flex-column align-items-center pt-2';
const primaryButtonClassName = 'btn btn-primary btn-block'
const secondaryButtonClassName = 'btn btn-link mt-2 d-block';
const secondaryButtonGroupClassName = 'd-flex flex-row justify-content-center pt-2';
const inputClassNameMap = {
    wrapper: 'form-group',
    input: 'form-control',
    valid: {
        subtext: 'form-text text-muted',
    },
    invalid: {
        input: 'is-invalid',
        subtext: 'invalid-feedback',
    },
};

ReactDOM.render(
    <IntlProvider locale="en" messages={messages}>
        <Router history={history}>
            <div>
                <div className="btn-group">
                    <Link className="btn btn-secondary" to="/create">Create User</Link>
                    <Link className="btn btn-secondary" to="/login">Login</Link>
                    <Link className="btn btn-secondary" to="/account">Account</Link>
                    <Link className="btn btn-secondary" to="/2fa">Choose 2fa</Link>
                    <Link className="btn btn-secondary" to="/2fa-u2f-register">Register U2F token</Link>
                    <Link className="btn btn-secondary" to="/2fa-u2f-authorize">U2F Authorize</Link>
                    <Link className="btn btn-secondary" to="/oauth-create">Create OAuth Client</Link>
                    <Link className="btn btn-secondary" to="/oauth-authorize">Authorize OAuth</Link>
                    <button className="btn btn-secondary" onClick={logout}>Log out</button>
                    <Link className="btn btn-secondary" to="/forgotpassword">forgot password</Link>
                </div>
                <div className="d-flex justify-content-center mt-5">
                    <div className="main-content">
                        <App
                            buttonGroupClassName={buttonGroupClassName}
                            primaryButtonClassName={primaryButtonClassName}
                            secondaryButtonClassName={secondaryButtonClassName}
                            inputClassNameMap={inputClassNameMap}
                            secondaryButtonGroupClassName={secondaryButtonGroupClassName}
                        />
                    </div>
                </div>
            </div>
        </Router>
    </IntlProvider>
    , document.getElementById('root'),
);
registerServiceWorker();
