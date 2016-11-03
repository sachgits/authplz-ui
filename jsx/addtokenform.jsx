'use strict';

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router'
import { BrowserHistory } from 'react-history'

import { Col, Form, FormGroup, ControlLabel, FormControl, Checkbox, Button, Alert } from 'react-bootstrap';
import { AuthPlz } from '../js/authplz';

// Login form component
class AddTokenForm extends React.Component {
  constructor(props) {
    super(props);
    // Create form state
    this.state = {
      name: ''
    }
    // Bind handlers
    this.handleNameChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handle form changes
  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  // Handle submit events
  handleSubmit(event) {
    console.log('Text field value is: ' + this.state.name);
  }

  render() {
    return (
      <div>
        <Col md={8} mdOffset={2}>
          <Form horizontal>
            <FormGroup controlId="formHorizontalName">
              <Col componentClass={ControlLabel} md={2}>
                Token Name
              </Col>
              <Col md={10}>
                <FormControl type="name" placeholder="Token Name" 
                  value={this.state.name}
                  onChange={this.handleEmailChange}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col mdOffset={2} md={10}>
                <Button onClick={this.handleSubmit}>
                  Add token
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
