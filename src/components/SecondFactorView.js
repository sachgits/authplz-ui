
import React from 'react'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const buttonStyle = {
  margin: 10,
};

class SecondFactorView extends React.Component {
  constructor(props) {
    super(props);
    // Create form state
    this.state = {
      factors: [],
      errors: {}
    }

    
  }


  render() {
    return (
      <div>

      </div>
    ) 
  }
}

SecondFactorView.propTypes = {
  validate: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
}

export {SecondFactorView}
