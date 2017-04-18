
import React from 'react';

import validator from 'validator';

import { Centerer } from '../components/Centerer';
import { CreateUserView } from '../components/CreateUserView';

import { AuthPlz } from '../AuthPlz';

console.log(AuthPlz);

const validateUserFields = (state) => {
    const errors = {};

    // Errors shown after submitted state is set
    if (state.submitted) {
        // TODO: could / should? validate username existence here
        if ((typeof state.username === 'undefined') || (state.username.length === 0)) {
            errors.username = 'username required';
        } else if (!validator.isAlphanumeric(state.username)) {
            errors.username = 'username must consist of alphanumeric characters';
        } else {
            delete errors.username;
        }

        if ((typeof state.email === 'undefined') || (state.email.length === 0)) {
            errors.email = 'email address required';
        } else if (!validator.isEmail(state.email)) {
            errors.email = 'email address must be of the form a@b.com';
        } else {
            delete errors.email;
        }

        if ((state.passwordOne.length === 0) || (state.passwordTwo.length === 0)) {
            errors.password = 'password must be set';
        } else if (state.passwordOne !== state.passwordTwo) {
            errors.password = 'Password mismatch';
        } else {
            delete errors.password;
        }
    }

    return errors;
};

class CreateUserPage extends React.Component {

    constructor(props) {
        super(props);
    // Create form state
        this.state = {
            error: '',
            result: '',
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

  // Called on submission of the child component (with no errors)
    onSubmit(state) {
        AuthPlz.CreateUser(state.email, state.username, state.passwordOne)
          .then((res) => {
              if (res.result === 'error') {
                  this.setState({ error: res.message });
              } else {
                  this.setState({ result: res.message });
              }
          }, (res) => {
              if (typeof res.message !== 'undefined') {
                  this.setState({ result: res.message });
              } else {
                  this.setState({ result: res });
              }
              console.log(res);
          });
    }

    render() {
        return (
            <Centerer>
                <CreateUserView
                  onSubmit={this.onSubmit}
                  validate={validateUserFields}
                  alert={this.state.result}
                />
            </Centerer>
        );
    }
}

export default CreateUserPage;
