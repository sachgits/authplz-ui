
import React from 'react';

import { Link } from 'react-router-dom';

import TextInput from '../../components/TextInput';
import {
    postAction,
    passwordReset,
} from '../../api/AuthPlz';

import {
    validatePassword,
    validateConfirmPassword,
} from './helpers';

const states = {
    LOADING: 'LOADING',
    STASIS: 'STASIS',
    SUCCESS: 'SUCCESS',
};

export default class RecoverPasswordPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            confirmPassword: '',
            passwordError: null,
            confirmPasswordError: null,
            result: null,
            status: states.LOADING,
        };
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const recoveryToken = params.get('token');
        postAction({ token: recoveryToken })
            .then(() => this.setState({
                status: states.STASIS,
            }))
            .catch(error => this.setState({
                error
            }));
    }

    onSubmit = () => {
        this.setState(prevState => ({
            passwordError: validatePassword(prevState.password),
            confirmPasswordError: validateConfirmPassword(prevState.password, prevState.confirmPassword),
        }), () => {
            const state = this.state;
            if (state.passwordError == null && state.confirmPasswordError == null) {
                passwordReset({ password: this.state.password })
                    .then(response => this.setState({ result: response.message }))
                    .catch(error => this.setState({ error }));
            }
        });
    }

    onKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.onSubmit(this.state);
        }
    }

    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(prevState => {
            const passwordError = prevState.passwordError != null
                ? validatePassword(password)
                : null;
            const confirmPasswordError = prevState.confirmPasswordError != null
                ? validatePassword(password, prevState.confirmPassword)
                : null;
            return {
                passwordError,
                confirmPasswordError,
                password,
            }
        });
    }

    onConfirmPasswordChange = (e) => {
        const confirmPassword = e.target.value;
        this.setState(prevState => {
            const confirmPasswordError = prevState.confirmPasswordError != null
                ? validatePassword(prevState.password, confirmPassword)
                : null;
            return {
                confirmPasswordError,
                confirmPassword,
            }
        });
    }

    render() {
        return (
            <fieldset onKeyDown={this.onKeyDown}>
                <h3>Enter a new password</h3>
                <TextInput
                  className="form-group"
                  labelText="Password"
                  value={this.state.password}
                  onChange={this.onPasswordChange}
                  errorText={this.state.passwordError}
                  type="password"
                />

                <TextInput
                  className="form-group"
                  labelText="Confirm Password"
                  value={this.state.confirmPassword}
                  onChange={this.onConfirmPasswordChange}
                  errorText={this.state.confirmPasswordError}
                  type="password"
                />

                <div className="flex-column align-items-center pt-2">
                    <button onClick={this.onSubmit} className="btn btn-primary btn-block">
                        Create
                    </button>
                    <Link to="/login" className="btn btn-link d-block mt-2">
                        Existing Account
                    </Link>
                </div>
            </fieldset>
        );
    }
}
