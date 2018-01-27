import React from 'react';

import Centerer from '../../components/Centerer';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import AlertView from '../../components/AlertView';

import AuthPlz from '../../AuthPlz';

const buttonStyle = {
    margin: 10,
};

const validate = (state) => {
    const errors = {};

    // Errors shown after submitted state is set
    if (state.submitted) {
      // TODO: could / should? validate email existence here
        if ((typeof state.email === 'undefined') || (state.email.length === 0)) {
            errors.email = 'username required';
        } else {
            delete errors.email;
        }

        if ((typeof state.password === 'undefined') || (state.password.length === 0)) {
            errors.password = 'password required';
        } else {
            delete errors.password;
        }
    }

    return errors;
};

class LoginUserPage extends React.Component {
    constructor(props) {
        super(props);
    // Create form state
        this.state = {
            alert: '',
            errors: {},
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleSubmit(this.state);
        }
    }

    handleEmailChange(e) {
        const state = this.state;
        state.email = e.target.value;
        this.setState({
            email: e.target.value,
            errors: validate(state)
        });
    }

    handlePasswordChange(e) {
        const state = this.state;
        state.password = e.target.value;
        this.setState({
            password: e.target.value,
            errors: validate(this.state)
        });
    }

    handleSubmit() {
        const state = this.state;
        state.submitted = true;

        const errors = validate(state);
        this.setState({ submitted: true, errors });

        if ((typeof errors === 'undefined') || (Object.keys(errors).length === 0)) {
            AuthPlz.Login(state.email, state.password)
                .then((res) => {
                    console.log(res);
                    this.setState({ alert: 'Login successful' });
                }, () => {
                    console.log('Login failed');
                    this.setState({ alert: 'Login error: invalid email address or password' });
                });
        } else {
            console.log(errors);
        }
    }

    render() {
        return (
            <Centerer>
                <TextField
                id="email" floatingLabelText="Email"
                value={this.state.email}
                onChange={this.handleEmailChange}
                fullWidth
                errorText={this.state.errors.email}
                onKeyPress={this.handleKeyPress}
                />

                <TextField
                id="password" floatingLabelText="Password"
                value={this.state.password}
                type="password"
                onChange={this.handlePasswordChange}
                fullWidth
                errorText={this.state.errors.password}
                onKeyPress={this.handleKeyPress}
                />

                <AlertView alert={this.state.alert} />

                <br /><br />
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <RaisedButton
                    label="Create Account"
                    style={buttonStyle}
                    href="/#/create"
                    />
                    <RaisedButton
                    label="Login"
                    primary
                    style={buttonStyle}
                    onClick={this.handleSubmit}
                    />
                </div>
            </Centerer>
        );
    }
}

export default LoginUserPage;
