import React from 'react';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './App.css';

import CreateUserPage from './pages/CreateUser';
import LoginUserPage from './pages/LoginUser';
import AccountPage from './pages/Account';
import SecondFactorPage from './pages/SecondFactor';

import FidoRegisterPage from './pages/FidoRegister';
import FidoAuthorizePage from './pages/FidoAuthorize';

import OAuthCreatePage from './pages/OAuthCreate';
import OAuthAuthorizePage from './pages/OAuthAuthorize';

export default () => (
    <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
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
        <Switch>
            <Route path="/create" component={CreateUserPage} />
            <Route path="/login" component={LoginUserPage} />
            <Route path="/account" component={AccountPage} />
            <Route path="/2fa" component={SecondFactorPage} />
            <Route path="/2fa-u2f-register" component={FidoRegisterPage} />
            <Route path="/2fa-u2f-authorize" component={FidoAuthorizePage} />
            <Route path="/oauth-create" component={OAuthCreatePage} />
            <Route path="/oauth-authorize" component={OAuthAuthorizePage} />
        </Switch>
    </MuiThemeProvider>
);
