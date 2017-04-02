'use strict';

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router'
import { BrowserHistory } from 'react-history'

import { Col, Form, FormGroup, ControlLabel, FormControl, Checkbox, Button, Alert } from 'react-bootstrap';
import { AuthPlz } from '../js/authplz';

import { u2f } from '../js/u2f-api.js';

// Login form component
class AddTokenForm extends React.Component {
  constructor(props) {
    super(props);
    // Create form state
    this.state = {
      name: '',
      message: ''
    }
    // Bind handlers
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setMessage = this.setMessage.bind(this);
  }

  // Handle form changes
  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  setMessage(m) {
    this.setState({message: m})
  }

  // Handle submit events
  handleSubmit(event) {

    // Handle a registration request from the server
    function handleRegistrationRequest(req) {
      console.log("Got registration request")
      console.log(req)
      this.setMessage("Insert your U2F token and push the flashing button")

      // Process registration challenge
      u2f.register(req.appId, req.registerRequests, req.registeredKeys || [], handleRegistrationResponse.bind(this), 60);
    }

    // Handle a registration response from the token
    function handleRegistrationResponse(resp) {
      console.log("Got registration response")
      console.log(resp)

      // Check for errors
      if(typeof resp.errorCode !== 'undefined') {
        console.log("Error: " + resp.errorMessage)

        this.setMessage("U2F Enrolment error")
        return
      }

      // Return response
      AuthPlz.PostU2FTokenEnrolment(resp).then(function registrationSuccess(res) {
        console.log("Enrolment complete")
        this.setMessage(res)
        
      }.bind(this), function RegistrationError(err) {
        console.log(err)
        this.setMessage(err)
      }.bind(this))
    }

    // Request registration
    AuthPlz.GetU2FTokenEnrolment(this.state.name).then(handleRegistrationRequest.bind(this), function handleError(err) {
      this.setMessage("Error fetching challenge from server")
    }.bind(this))

  }

  render() {
    return (
      <div>
        <Col md={8} mdOffset={2}>
          <Alert bsStyle="info" hidden={!this.state.message}>{this.state.message}</Alert>
          <Form horizontal>
            <FormGroup controlId="formHorizontalName">
              <Col componentClass={ControlLabel} md={2}>
                Token Name
              </Col>
              <Col md={10}>
                <FormControl type="name" placeholder="Token Name" 
                  value={this.state.name}
                  onChange={this.handleNameChange}
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

export {AddTokenForm}
