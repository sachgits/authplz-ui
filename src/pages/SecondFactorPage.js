
import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';

import { SecondFactorView } from '../components/SecondFactorView.js'

import AuthPlz from '../AuthPlz.js'

class SecondFactorPage extends React.Component {
   constructor(props) {
    super(props);
    // Create form state
    this.state = {}

    
  }

  loadFactors() {

  }


  validate(state) {
    let errors = {}


    return errors
  }

  onSubmit(state) {
    

  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xsOffset={1} xs={10} smOffset={3} sm={6} mdOffset={4} md={4}>
            <SecondFactorView />
          </Col>
        </Row>
      </Grid>
    ) 
  }
}

export {SecondFactorPage}
