import React from 'react';

import { Link } from 'react-router-dom';

import TextInput from '../../components/TextInput';
import { login } from '../../AuthPlz';

import {
    validateEmail,
    validatePassword,
} from './helpers';
import { FormattedMessage } from 'react-intl';

const states = {
    SUCCESS: 'SUCCESS',
};

class LoginUserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            alert: '',
            email: '',
            password: '',
            passwordError: null,
            emailError: null,
        };
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onSubmit();
        }
    }

    handleEmailChange = (e) => {
        const email = e.target.value;
        this.setState(prevState => ({
            email,
            errors: prevState.emailError ?
                validateEmail(email)
                : null,
        }));
    }

    handlePasswordChange = (e) => {
        const password = e.target.value;
        this.setState(prevState => ({
            password,
            passwordError: prevState.passwordError != null
                ? validatePassword(password)
                : null,
        }));
    }

    onSubmit = () => {
        this.setState(prevState => ({
            emailError: validateEmail(prevState.email),
            passwordError: validatePassword(prevState.password),
        }), () => {
            const state = this.state;
            if (state.emailError == null && state.usernameError == null) {
                login({
                    email: state.email,
                    password: state.password
                })
                .then(res => this.setState({ status: states.SUCCESS }))
                .catch(error => { this.setState({
                    status: states.FAILED,
                    error
                }) });
            }
        });
    }

    render() {
        return (
            <fieldset onKeyDown={this.onKeyDown}>
                <TextInput
                    id="email"
                    labelText="Email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    fullWidth
                    errorText={this.state.emailError}
                />

                <TextInput
                    id="password"
                    labelText="Password"
                    value={this.state.password}
                    type="password"
                    onChange={this.handlePasswordChange}
                    fullWidth
                    errorText={this.state.passwordError}
                />

                {this.state.error != null && (
                    <div className="text-danger">
                        <FormattedMessage id={this.state.error} />
                    </div>
                )}

                <div className="flex-column align-items-center pt-2">
                    <button onClick={this.onSubmit} className="btn btn-primary btn-block">
                        Login
                    </button>
                    <Link to="/create" className="btn btn-link d-block mt-2">
                        Create Account
                    </Link>
                </div>
            </fieldset>
        );
    }
}

export default LoginUserPage;
