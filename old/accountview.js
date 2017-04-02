'use strict';

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router'
import { BrowserHistory } from 'react-history'
import validator from 'validator';
import { AuthPlz } from '../js/authplz';

import moment from 'moment'

import { Col, Table, Form, FormGroup, ControlLabel, FormControl, Checkbox, Button, Alert, HelpBlock } from 'react-bootstrap';

class MomentDate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      {moment(this.props.date).calendar()}
      </div>
    )
  }
}

// Create user form component
class AccountView extends React.Component {
  constructor(props) {
    super(props);
    // Create form state
    this.state = {
      user: {}
    }

    AuthPlz.Account().then((user) => {
      this.setState({user: user});
    }, (err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <h3>User: {this.state.user.Email}</h3>
        <Table bordered condensed>
        <tbody>
          <tr>
            <td>Created</td>
            <td><MomentDate date={this.state.user.CreatedAt} /></td>
          </tr>
          <tr>
            <td>Last Login</td>
            <td><MomentDate date={this.state.user.LastLogin} /></td>
          </tr>
        </tbody>
      </Table>
      </div>
    );
  }
}

export {AccountView}
