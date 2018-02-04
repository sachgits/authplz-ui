import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';

import CreateUserPage from './pages/CreateUser';
import LoginUserPage from './pages/LoginUser';
import AccountPage from './pages/Account';
import SecondFactorPage from './pages/SecondFactor';

import FidoRegisterPage from './pages/FidoRegister';
import FidoAuthorizePage from './pages/FidoAuthorize';

import OAuthCreatePage from './pages/OAuthCreate';
import OAuthAuthorizePage from './pages/OAuthAuthorize';
import ForgotPasswordPage from './pages/ForgotPassword';
import RecoverPasswordPage from './pages/RecoverPassword';

export default props => (
    <Switch>
        <Route path="/create" render={routeProps => <CreateUserPage {...routeProps} {...props} />} />
        <Route path="/login" render={routeProps => <LoginUserPage {...routeProps} {...props} />} />
        <Route path="/account" render={routeProps => <AccountPage {...routeProps} {...props} />} />
        <Route path="/2fa" render={routeProps => <SecondFactorPage {...routeProps} {...props} />} />
        <Route path="/2fa-u2f-register" render={routeProps => <FidoRegisterPage {...routeProps} {...props} />} />
        <Route path="/2fa-u2f-authorize" render={routeProps => <FidoAuthorizePage {...routeProps} {...props} />} />
        <Route path="/oauth-create" render={routeProps => <OAuthCreatePage {...routeProps} {...props} />} />
        <Route path="/oauth-authorize" render={routeProps => <OAuthAuthorizePage {...routeProps} {...props} />} />
        <Route path="/forgotpassword" render={routeProps => <ForgotPasswordPage {...routeProps} {...props} />} />
        <Route path="/recover" render={routeProps => <RecoverPasswordPage {...routeProps} {...props} />} />
        <Route path="/activate" render={routeProps => <LoginUserPage {...routeProps} {...props} isAccountActivation />} />
    </Switch>
);
