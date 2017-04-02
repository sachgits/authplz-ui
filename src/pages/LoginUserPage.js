
import React from 'react'
import { render } from 'react-dom'
import validator from 'validator';

import { Grid, Row, Col } from 'react-flexbox-grid';

import { LoginUserView } from '../components/LoginUserView.js'


class LoginUserPage extends React.Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xsOffset={1} xs={10} smOffset={3} sm={6} mdOffset={4} md={4}>
            <LoginUserView />
          </Col>
        </Row>
      </Grid>
    ) 
  }
}

export {LoginUserPage}
