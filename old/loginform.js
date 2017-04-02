'use strict';

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router'
import { BrowserHistory } from 'react-history'

import { Col, Form, FormGroup, ControlLabel, FormControl, Checkbox, Button, Alert } from 'react-bootstrap';
import { AuthPlz } from '../js/authplz';

// Login form component
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    // Create form state
    this.state = {
      email: '',
      password: '',
      csrf: '',
      successMessage: '',
      errorMessage: ''
    }
    // Bind handlers
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handle form changes
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  // Handle submit events
  handleSubmit(event) {
    AuthPlz.Login(this.state.email, this.state.password).then((res) => {
      this.setState({successMessage: res.data.message})
    }, (err) => {
      console.log(err)
      this.setState({errorMessage: err})
    })
  }

  render() {
    return (
      <div>
        <Col md={2} />
        <Col md={8}>
          <Alert bsStyle="success" hidden={!this.state.successMessage}>{this.state.successMessage}</Alert>
          <Alert bsStyle="danger" hidden={!this.state.errorMessage}>{this.state.errorMessage}</Alert>
          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} md={2}>
                Email
              </Col>
              <Col md={10}>
                <FormControl type="email" placeholder="Email" 
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} md={2}>
                Password
              </Col>
              <Col md={10}>
                <FormControl type="password" placeholder="Password" 
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col mdOffset={2} md={10}>
                <Checkbox>Remember me</Checkbox>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col mdOffset={2} md={10}>
                <Button onClick={this.handleSubmit}>
                  Sign in
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </div>
    );
  }

}

export {LoginForm}
