import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router';
import { BeatLoader } from 'react-spinners';

import TextInput from '../../components/TextInput';
import {
    login,
    activateToken,
} from '../../api/AuthPlz';
import {
    validateEmail,
    validatePassword,
} from './helpers';

const states = {
    STASIS: 'STASIS',
    SUCCESS: 'SUCCESS',
    LOADING: 'LOADING',
    TOKEN_FAILED: 'TOKEN_FAILED',
};

class LoginUserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            alert: '',
            email: '',
            password: '',
            status: props.isAccountActivation ? states.LOADING : states.STASIS,
            passwordError: null,
            emailError: null,
        };
    }

    componentDidMount() {
        if (this.props.isAccountActivation) {
            const params = new URLSearchParams(window.location.search);
            const activationToken = params.get('token');
            activateToken({ token: activationToken })
                .then(() => this.setState({ status: states.STASIS }))
                .catch(() => this.setState({ status: states.TOKEN_FAILED }));
        }
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

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onSubmit();
        }
    }

    handleEmailChange = (e) => {
        const email = e.target.value;
        this.setState(prevState => ({
            email,
            emailError: prevState.emailError ?
                validateEmail(email)
                : null,
        }));
    }

    handlePasswordChange = (e) => {
        const password = e.target.value;
        this.setState(prevState => ({
            password,
            passwordError: prevState.passwordError != null
                ? this.validatePassword(password)
                : null,
        }));
    }

    onSubmit = () => {
        this.setState(prevState => ({
            emailError: this.validateEmail(prevState.email),
            passwordError: this.validatePassword(prevState.password),
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
        const {
            inputClassNameMap,
            buttonGroupClassName,
            primaryButtonClassName,
            secondaryButtonClassName,
            secondaryButtonGroupClassName,
        } = this.props;
        switch(this.state.status) {
        case states.SUCCESS:
            return <Redirect to="/account" />;
        case states.LOADING:
            return <BeatLoader />;
        case states.TOKEN_FAILED:
            return (
                <div>
                    <h3>
                        <FormattedMessage id="ACTIVATE_TOKEN_FAILED_HEADER" />
                    </h3>
                    <FormattedMessage id="ACTIVATE_TOKEN_FAILED" />
                </div>
            );
        default:
        case states.STASIS:
            return (
                <fieldset onKeyDown={this.onKeyDown}>
                    {this.props.isAccountActivation && (
                        <div>
                            <h3><FormattedMessage id="ACTIVATE_ACCOUNT_HEADER" /></h3>
                            <FormattedMessage id="ACTIVATE_ACCOUNT" />
                        </div>
                    )}
                    <TextInput
                        classNameMap={inputClassNameMap}
                        id="email"
                        labelText="Email"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        errorText={this.state.emailError}
                    />

                    <TextInput
                        classNameMap={inputClassNameMap}
                        id="password"
                        labelText="Password"
                        value={this.state.password}
                        type="password"
                        onChange={this.handlePasswordChange}
                        errorText={this.state.passwordError}
                    />

                    {this.state.error != null && (
                        <div className="text-danger">
                            <FormattedMessage id={this.state.error} />
                        </div>
                    )}

                    <div className={buttonGroupClassName}>
                        <button onClick={this.onSubmit} className={primaryButtonClassName}>
                            Login
                        </button>
                        <div className={secondaryButtonGroupClassName}>
                            <Link to="/create" className={secondaryButtonClassName}>
                                Create account
                            </Link>
                            <Link to="/forgotpassword" className={secondaryButtonClassName}>
                                Forgot password?
                            </Link>
                        </div>
                    </div>
                </fieldset>
            );
        }
    }
}

LoginUserPage.propTypes = {
    isAccountActivation: PropTypes.bool,
};

export default injectIntl(LoginUserPage);
