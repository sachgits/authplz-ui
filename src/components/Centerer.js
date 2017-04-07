import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';


class Centerer extends React.Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xsOffset={1} xs={10} smOffset={3} sm={6} mdOffset={4} md={4}>
            {this.props.children}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export { Centerer }