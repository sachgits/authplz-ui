
import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import TextInput from '../../components/TextInput';
import AlertView from '../../components/AlertView';

import { createUser } from '../../api/AuthPlz';

import {
    validateUsername,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
} from './helpers';

class CreateUserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            created: false,
            usernameError: null,
            emailError: null,
            passwordError: null,
            confirmPasswordError: null,
            result: null,
        };
    }

    validateUsername = username => {
        const error = validateUsername(username);
        return error != null
            ? this.props.intl.formatMessage({ id: error })
            : null;
    }

    validateEmail = email => {
        const error = validateEmail(email);
        return error != null
            ? this.props.intl.formatMessage({ id: error })
            : null;
    }
    
    validatePassword = password => {
        const error = validatePassword(password);
        return error != null
            ? this.props.intl.formatMessage({ id: error })
            : null;
    }

    validateConfirmPassword = (password, confirmPassword) => {
        const error = validateConfirmPassword(password, confirmPassword);
        return error != null
            ? this.props.intl.formatMessage({ id: error })
            : null;
    }

    onSubmit = () => {
        this.setState(prevState => ({
            usernameError: this.validateUsername(prevState.username),
            emailError: this.validateEmail(prevState.email),
            passwordError: this.validatePassword(prevState.password),
            confirmPasswordError: this.validateConfirmPassword(prevState.password, prevState.confirmPassword),
        }), () => {
            const state = this.state;
            const formIsValid = (
                state.usernameError == null
                && state.emailError == null
                && state.passwordError == null
                && state.confirmPasswordError == null
            );

            if (formIsValid) {
                createUser({
                    email: this.state.email,
                    username: this.state.username,
                    password: this.state.password
                })
                    .then(response => this.setState({
                        created: true,
                    }))
                    .catch(error => this.setState({ error }));
            }
        });
    }

    onKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.onSubmit(this.state);
        }
    }

    onUsernameChange = (e) => {
        const username = e.target.value;
        this.setState(prevState => {
            const usernameError = prevState.usernameError != null
                ? this.validateUsername(username)
                : null;
            return {
                usernameError,
                username,
            }
        });
    }

    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(prevState => {
            const emailError = prevState.emailError != null
                ? this.validateEmail(email)
                : null;
            return {
                emailError,
                email,
            }
        });
    }

    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(prevState => {
            const passwordError = prevState.passwordError != null
                ? this.validatePassword(password)
                : null;
            const confirmPasswordError = prevState.confirmPasswordError != null
                ? this.validatePassword(password, prevState.confirmPassword)
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
                ? this.validatePassword(prevState.password, confirmPassword)
                : null;
            return {
                confirmPasswordError,
                confirmPassword,
            }
        });
    }

    render() {
        const {
            intl,
            inputClassNameMap,
            buttonGroupClassName,
            primaryButtonClassName,
            secondaryButtonClassName,
        } = this.props;
        if (this.state.created) {
            return (
                <div>
                    <h3>
                        <FormattedMessage id="CREATE_USER_SUCCESS_HEADER" />
                    </h3>
                    <div>
                        <FormattedMessage id="CREATE_USER_SUCCESS" />
                    </div>
                </div>
            )
        }
        return (
            <fieldset onKeyDown={this.onKeyDown}>
                <TextInput
                    classNameMap={inputClassNameMap}
                    labelText={intl.formatMessage({ id: 'USERNAME_LABEL' })}
                    value={this.state.username}
                    onChange={this.onUsernameChange}
                    errorText={this.state.usernameError}
                />

                <TextInput
                    classNameMap={inputClassNameMap}
                    labelText={intl.formatMessage({ id: 'EMAIL_LABEL' })}
                    value={this.state.email}
                    onChange={this.onEmailChange}
                    errorText={this.state.emailError }
                />

                <TextInput
                    classNameMap={inputClassNameMap}
                    labelText={intl.formatMessage({ id: 'PASSWORD_LABEL' })}
                    value={this.state.password}
                    onChange={this.onPasswordChange}
                    errorText={this.state.passwordError }
                    type="password"
                />

                <TextInput
                    classNameMap={inputClassNameMap}
                    labelText={intl.formatMessage({ id: 'CONFIRM_PASSWORD_LABEL' })}
                    value={this.state.confirmPassword}
                    onChange={this.onConfirmPasswordChange}
                    errorText={this.state.confirmPasswordError }
                    type="password"
                />

                <AlertView alert={this.state.result} />

                <div className={buttonGroupClassName}>
                    <button onClick={this.onSubmit} className={primaryButtonClassName}>
                        <FormattedMessage id="CREATE_USER_SUBMIT_BUTTON" />
                    </button>
                    <Link to="/login" className={secondaryButtonClassName}>
                        <FormattedMessage id="EXISTING_ACCOUNT_BUTTON" />
                    </Link>
                </div>
            </fieldset>
        );
    }
}

CreateUserPage.propTypes = {
    intl: intlShape,
    inputClassNameMap: PropTypes.object,
    buttonGroupClassName: PropTypes.string,
    primaryButtonClassName: PropTypes.string,
    secondaryButtonClassName: PropTypes.string,
};

export default injectIntl(CreateUserPage);
