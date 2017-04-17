import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import AlertView from '../components/AlertView';


const buttonStyle = {
    margin: 10,
};

class LoginUserView extends React.Component {
    constructor(props) {
        super(props);
    // Create form state
        this.state = {
            email: '',
            password: '',
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
        this.setState({ email: e.target.value, errors: this.props.validate(state) });
    }

    handlePasswordChange(e) {
        const state = this.state;
        state.password = e.target.value;
        this.setState({ password: e.target.value, errors: this.props.validate(this.state) });
    }

    handleSubmit() {
        const state = this.state;
        state.submitted = true;

        const errors = this.props.validate(state);
        this.setState({ submitted: true, errors });

        if ((typeof errors === 'undefined') || (Object.keys(errors).length === 0)) {
            this.props.onSubmit(this.state);
        } else {
            console.log(errors);
        }
    }

    render() {
        return (
            <div>
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

                <AlertView alert={this.props.alert} />

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

            </div>
        );
    }
}

LoginUserView.propTypes = {
    validate: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    alert: React.PropTypes.string,
};

export default LoginUserView;
