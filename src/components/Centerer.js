import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';

import Paper from 'material-ui/Paper';

const style = {
  height: '100%',
  margin: 20
};

class Centerer extends React.Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Paper style={style} zDepth={1}>
          <div style={{display: 'flex', maxWidth: '500px', margin: '32px', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            {this.props.children}
            </div>
          </Paper>
          
        </Row>
      </Grid>
    );
  }
}

export { Centerer }