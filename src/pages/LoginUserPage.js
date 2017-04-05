
import React from 'react'

import { Centerer } from '../components/Centerer.js'
import { LoginUserView } from '../components/LoginUserView.js'

import { AuthPlz } from '../AuthPlz.js'


class LoginUserPage extends React.Component {
   constructor(props) {
    super(props);
    // Create form state
    this.state = {
      alert: ''
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

    return errors
  }

  onSubmit(state) {
    AuthPlz.Login(state.email, state.password)
    .then(function(res) {
      console.log(res)
      this.setState({alert: "Login successful"})
    }.bind(this), function(err) {
      console.log("Login failed")
      this.setState({alert: "Login error: invalid email address or password"})
    }.bind(this))
  }

  render() {
    return (
      <Centerer>
          <LoginUserView onSubmit={this.onSubmit} validate={this.validate} alert={this.state.alert}/>
      </Centerer>
    ) 
  }
}

export {LoginUserPage}
