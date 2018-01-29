
import React from 'react';

import validator from 'validator';

import TextInput from '../../components/TextInput';
import AlertView from '../../components/AlertView';

import AuthPlz from '../../AuthPlz';
import { Link } from 'react-router-dom';

const validateUserFields = (state) => {
    const errors = {};

    // Errors shown after submitted state is set
    if (state.submitted) {
        // TODO: could / should? validate username existence here
        if ((typeof state.username === 'undefined') || (state.username.length === 0)) {
            errors.username = 'username required';
        } else if (!validator.isAlphanumeric(state.username)) {
            errors.username = 'username must consist of alphanumeric characters';
        }

        if ((typeof state.email === 'undefined') || (state.email.length === 0)) {
            errors.email = 'email address required';
        } else if (!validator.isEmail(state.email)) {
            errors.email = 'email address must be of the form a@b.com';
        }

        if ((state.passwordOne.length === 0) || (state.passwordTwo.length === 0)) {
            errors.password = 'password must be set';
        } else if (state.passwordOne !== state.passwordTwo) {
            errors.password = 'Password mismatch';
        }
    }

    return errors;
};

class CreateUserPage extends React.Component {
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
            error: '',
            result: '',
        };
        this.onSubmit = this.onSubmit.bind(this);

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordOneChange = this.handlePasswordOneChange.bind(this);
        this.handlePasswordTwoChange = this.handlePasswordTwoChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    onSubmit() {
        this.setState(prevState => ({
            submitted: true,
            errors: validateUserFields(prevState),
        }), () => {
            if (this.state.errors) {
                AuthPlz.CreateUser(this.state.email, this.state.username, this.state.passwordOne)
                    .then((response) => {
                        if (response.result === 'error') {
                            this.setState({ error: response.message });
                        } else {
                            this.setState({ result: response.message });
                        }
                    }, (response) => {
                        if (typeof response.message !== 'undefined') {
                            this.setState({ result: response.message });
                        } else {
                            this.setState({ result: response });
                        }
                    });
            }
        });
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.onSubmit(this.state);
        }
    }

    handleUsernameChange(e) {
        const state = this.state;
        state.username = e.target.value;
        this.setState({
            username: e.target.value,
            errors: validateUserFields(state),
        });
    }

    handleEmailChange(e) {
        const state = this.state;
        state.email = e.target.value;
        this.setState({
            email: e.target.value,
            errors: validateUserFields(state),
        });
    }

    handlePasswordOneChange(e) {
        const state = this.state;
        state.passwordOne = e.target.value;
        this.setState({
            passwordOne: e.target.value,
            errors: validateUserFields(this.state),
        });
    }

    handlePasswordTwoChange(e) {
        const state = this.state;
        state.passwordTwo = e.target.value;
        this.setState({
            passwordTwo: e.target.value,
            errors: validateUserFields(this.state),
        });
    }

    render() {
        return (
            <fieldset>
                <TextInput
                  id="username"
                  className="form-group"
                  labelText="Username"
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                  errorText={this.state.errors.username}
                  onKeyPress={this.handleKeyPress}
                />

                <TextInput
                  id="email"
                  className="form-group"
                  labelText="Email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  fullWidth
                  errorText={this.state.errors.email}
                  onKeyPress={this.handleKeyPress}
                />

                <TextInput
                  id="password1"
                  className="form-group"
                  labelText="Password"
                  value={this.state.passwordOne}
                  onChange={this.handlePasswordOneChange}
                  type="password"
                  fullWidth
                  onKeyPress={this.handleKeyPress}
                />

                <TextInput
                  id="password2"
                  className="form-group"
                  labelText="Password (again)"
                  value={this.state.passwordTwo}
                  onChange={this.handlePasswordTwoChange}
                  type="password"
                  fullWidth
                  errorText={this.state.errors.password}
                  onKeyPress={this.handleKeyPress}
                />

                <AlertView alert={this.state.result} />

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Link to="/login" className="btn btn-secondary">
                        Existing Account
                    </Link>
                    <button onClick={this.onSubmit} className="btn btn-primary">
                        Create
                    </button>
                </div>
            </fieldset>
        );
    }
}

export default CreateUserPage;
