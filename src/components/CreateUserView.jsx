
import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import AlertView from '../components/AlertView';

const buttonStyle = {
    margin: 10,
};

class CreateUserView extends React.Component {

    constructor(props) {
        super(props);
      // Create form state
        this.state = {
            submitted: false,
            username: '',
            email: '',
            passwordOne: '',
            passwordTwo: '',
            successMessage: '',
            errors: {
                username: '',
                email: '',
                password: '',
            },
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordOneChange = this.handlePasswordOneChange.bind(this);
        this.handlePasswordTwoChange = this.handlePasswordTwoChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleSubmit(this.state);
        }
    }

    handleUsernameChange(e) {
        const state = this.state;
        state.username = e.target.value;
        this.setState({ username: e.target.value, errors: this.props.validate(state) });
    }

    handleEmailChange(e) {
        const state = this.state;
        state.email = e.target.value;
        this.setState({ email: e.target.value, errors: this.props.validate(state) });
    }

    handlePasswordOneChange(e) {
        const state = this.state;
        state.passwordOne = e.target.value;
        this.setState({ passwordOne: e.target.value, errors: this.props.validate(this.state) });
    }

    handlePasswordTwoChange(e) {
        const state = this.state;
        state.passwordTwo = e.target.value;
        this.setState({ passwordTwo: e.target.value, errors: this.props.validate(this.state) });
    }

    handleSubmit() {
        const state = this.state;
        state.submitted = true;

        const errors = this.props.validate(state);
        this.setState({ submitted: true, errors });

        if ((typeof errors === 'undefined') || (Object.keys(errors).length === 0)) {
            this.props.onSubmit(this.state);
        }
    }

    render() {
        return (
            <div>
                <TextField
                  id="username"
                  floatingLabelText="Username"
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                  fullWidth
                  errorText={this.state.errors.username}
                  onKeyPress={this.handleKeyPress}
                />

                <TextField
                  id="email" floatingLabelText="Email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  fullWidth
                  errorText={this.state.errors.email}
                  onKeyPress={this.handleKeyPress}
                />

                <TextField
                  id="password1" floatingLabelText="Password"
                  value={this.state.passwordOne}
                  onChange={this.handlePasswordOneChange}
                  type="password"
                  fullWidth
                  onKeyPress={this.handleKeyPress}
                />

                <TextField
                  id="password2" floatingLabelText="Password (again)"
                  value={this.state.passwordTwo}
                  onChange={this.handlePasswordTwoChange}
                  type="password"
                  fullWidth
                  errorText={this.state.errors.password}
                  onKeyPress={this.handleKeyPress}
                />

                <br /><br />

                <AlertView alert={this.props.alert} />

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <RaisedButton
                      label="Existing Account"
                      style={buttonStyle}
                      href="/#/login"
                    />
                    <RaisedButton
                      label="Create"
                      primary
                      style={buttonStyle}
                      onClick={this.handleSubmit}
                    />
                </div>
            </div>
        );
    }
}

CreateUserView.propTypes = {
    validate: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    alert: React.PropTypes.string,
};

export default CreateUserView;
