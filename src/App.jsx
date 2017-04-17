import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import { BrowserHistory } from 'react-history';

import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './App.scss';

import { CreateUserPage } from './pages/CreateUserPage';
import { LoginUserPage } from './pages/LoginUserPage';
import { AccountPage } from './pages/AccountPage';
import { SecondFactorPage } from './pages/SecondFactorPage';

import { FidoRegisterPage } from './pages/FidoRegisterPage';
import { FidoAuthorizePage } from './pages/FidoAuthorizePage';

import { OAuthCreatePage } from './pages/OAuthCreatePage';
import { OAuthAuthorizePage } from './pages/OAuthAuthorizePage';

injectTapEventPlugin();

const App = () =>
    <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
        <div>
            <h1>AuthPlz</h1>
            <HashRouter history={BrowserHistory}>
                <div>
                    <ul>
                        <li><Link to="/create">Create User</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/account">Account</Link></li>
                        <li><Link to="/2fa">Choose 2fa</Link></li>
                        <li><Link to="/2fa-u2f-register">Register U2F token</Link></li>
                        <li><Link to="/2fa-u2f-authorize">U2F Authorize</Link></li>
                        <li><Link to="/oauth-create">Create OAuth Client</Link></li>
                        <li><Link to="/oauth-authorize">Authorize OAuth</Link></li>
                    </ul>
                    <Route path="/create" component={CreateUserPage} />
                    <Route path="/login" component={LoginUserPage} />
                    <Route path="/account" component={AccountPage} />
                    <Route path="/2fa" component={SecondFactorPage} />
                    <Route path="/2fa-u2f-register" component={FidoRegisterPage} />
                    <Route path="/2fa-u2f-authorize" component={FidoAuthorizePage} />
                    <Route path="/oauth-create" component={OAuthCreatePage} />
                    <Route path="/oauth-authorize" component={OAuthAuthorizePage} />
                </div>
            </HashRouter>
        </div>
    </MuiThemeProvider>;

export default App;
