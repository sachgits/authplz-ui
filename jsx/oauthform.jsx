'use strict';

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router'
import { BrowserHistory } from 'react-history'

import { Col, Form, FormGroup, ControlLabel, FormControl, Checkbox, Button, Alert } from 'react-bootstrap';
import { AuthPlz } from '../js/authplz';

import { u2f } from '../js/u2f-api.js';

// Login form component
class OAuthAuthorizeForm extends React.Component {
  constructor(props) {
    super(props);
    // Create form state
    this.state = {
      redirectUrl: '',
      responseTypes: [],
      state: '',
      scopes: '',
      grantedScopes: '',
      message: '',
    }

    // Bind handlers
    this.load = this.load.bind(this);
    this.handleGrantedScopesChange = this.handleGrantedScopesChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setMessage = this.setMessage.bind(this);
  }

  setMessage(e) {
    this.setState({message: e});
  }

  // Load pending authorizations
  load() {
    // Handle a registration request from the server
    function handleAuthorizationRequest(req) {
      console.log("Got authorization request")
      console.log(req)

      this.setMessage("Pending Authorization:")

      this.setState({
        redirectUrl: req.redirectUrl,
        responseTypes: req.responseTypes,
        state: req.state,
        scopes: req.scopes,
        grantedScopes: req.grantedScopes,
      })
    }

    // Request pending authorizations
    AuthPlz.GetPendingAuthorization().then(handleAuthorizationRequest.bind(this), function handleError(err) {
      this.setMessage("Error fetching pending authorization from server")
    }.bind(this))
  }

  // Handle form changes
  handleGrantedScopesChange(e) {
    this.setState({scopes: e.target.value});
  }

  // Handle submit events
  handleSubmit(event) {
    AuthPlz.PostAuthorizationAccept(true, this.state.state, this.state.grantedScopes).then(function() {

    }, function(err) {

    })
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

export {OAuthAuthorizeForm}
