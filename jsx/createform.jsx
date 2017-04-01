'use strict';

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router'
import { BrowserHistory } from 'react-history'
import validator from 'validator';
import { AuthPlz } from '../js/authplz';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import '../scss/main.scss';

import { Col, Form, FormGroup, ControlLabel, FormControl, Checkbox, Button, Alert, HelpBlock } from 'react-bootstrap';

// Create user form component
class CreateUserForm extends React.Component {
  constructor(props) {
    super(props);
    // Create form state
    this.state = {
      username: '',
      email: '',
      passwordOne: '',
      passwordTwo: '',
      csrf: '',
      successMessage: '',
      errorMessage: ''
    }
    // Bind handlers
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.getEmailValidation = this.getEmailValidation.bind(this);
    this.handlePasswordOneChange = this.handlePasswordOneChange.bind(this);
    this.handlePasswordTwoChange = this.handlePasswordTwoChange.bind(this);
    this.getPasswordValidation = this.getPasswordValidation.bind(this);
    this.showPasswordHelp = this.showPasswordHelp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handle form changes
  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  getEmailValidation() {
    if(validator.isEmail(this.state.email)) {
      return "success"
    }
    return "error"
  }

  handlePasswordOneChange(e) {
    this.setState({passwordOne: e.target.value});
  }

  handlePasswordTwoChange(e) {
    this.setState({passwordTwo: e.target.value});
  }

  getPasswordValidation() {
    if((this.state.passwordOne === this.state.passwordTwo) && (this.state.passwordOne.length > 0)) {
      return "success"
    }
    return "error"
  }

  showPasswordHelp() {
    return (this.state.passwordOne !== this.state.passwordTwo) 
      && (this.state.passwordOne.length > 0)
      && (this.state.passwordTwo.length > 0)
  }

  // Handle submit events
  handleSubmit(event) {
    this.setState({successMessage: '', errorMessage: 'Password entries must match'})
    if(this.state.passwordOne !== this.state.passwordTwo) {
      console.log("Password mismatch")
      return
    }

    AuthPlz.CreateUser(this.state.username, this.state.email, this.state.passwordOne).then((res) => {
      //TODO: handle 202 and required 2fa
      this.setState({successMessage: res.message})
    }, (res) => {
      this.setState({errorMessage: res.message})
    })
  }

  render() {
    return (
      <div>
        <TextField id="username" label="Username" 
          value={this.state.username}
          onChange={this.handleUsernameChange}
        />
        <br />
        <br />

        <TextField id="email" hintText="Email" 
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <br />
        <br />

        <TextField id="password1" hintText="Password" 
          value={this.state.passwordOne}
          onChange={this.handlePasswordOneChange}
        />
        <br />
        <br />

        <TextField id="password2" hintText="Password" 
          value={this.state.passwordTwo}
          onChange={this.handlePasswordTwoChange}
        />
        <br />
        <br />
        
        <RaisedButton label="Create User" onClick={this.handleSubmit}/>
      </div>
    );
  }
}

export {CreateUserForm}
