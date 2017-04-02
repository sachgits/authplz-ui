
import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';

import { LoginUserView } from '../components/LoginUserView.js'


class LoginUserPage extends React.Component {
   constructor(props) {
    super(props);
    // Create form state
    this.state = {}

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }


  validate(state) {
    let errors = {}

    // Errors shown after submitted state is set
    if (state.submitted) {
      // TODO: could / should? validate username existence here
      if ((typeof state.username === "undefined") || (state.username.length === 0)) {
        errors.username = "username required"
      } else {
        delete errors.username
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
    console.log("Submit: ")
    console.log(state)

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
