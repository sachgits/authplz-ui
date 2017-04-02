
import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';

import { LoginUserView } from '../components/LoginUserView.js'

import { AuthPlz } from '../AuthPlz.js'


class LoginUserPage extends React.Component {
   constructor(props) {
    super(props);
    // Create form state
    this.state = {
      message: ''
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  validate(state) {
    let errors = {}

    // Errors shown after submitted state is set
    if (state.submitted) {
      // TODO: could / should? validate email existence here
      if ((typeof state.email === "undefined") || (state.email.length === 0)) {
        errors.email = "username required"
      } else {
        delete errors.email
      }

      if ((typeof state.password === "undefined") || (state.password.length === 0)) {
        errors.password = "password required"
      } else {
        delete errors.password
      }
    }

    if (this.state.message !== "") {
      errors.message = this.state.message
    } else {
      delete errors.message
    }

    return errors
  }

  onSubmit(state) {
    AuthPlz.Login(state.email, state.password)
    .then(function(res) {
      console.log("Login ok")
      this.setState({message: "Login successful"})
    }, function(err) {
      console.log("Login failed")
      this.setState({message: "Login error: invalid email address or password"})
    })
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xsOffset={1} xs={10} smOffset={3} sm={6} mdOffset={4} md={4}>
            <LoginUserView onSubmit={this.onSubmit} validate={this.validate}/>
          </Col>
        </Row>
      </Grid>
    ) 
  }
}

export {LoginUserPage}
