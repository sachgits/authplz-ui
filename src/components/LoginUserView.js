
import React from 'react'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const buttonStyle = {
  margin: 10,
};

class LoginUserView extends React.Component {
  constructor(props) {
    super(props);
    // Create form state
    this.state = {
      email: '',
      password: '',
      successMessage: '',
      errorMessage: ''
    }
  }

  render() {
    return (
      <div>
        <TextField id="email" floatingLabelText="Email" 
          value={this.state.email}
          onChange={this.handleEmailChange}
          fullWidth={true}
        />

        <TextField id="password" floatingLabelText="Password" 
          value={this.state.password}
          onChange={this.handlePasswordOneChange}
          fullWidth={true}
        />
        
        <br /><br />
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <RaisedButton label="Create Account" style={buttonStyle} href="/#/create" />
            <RaisedButton label="Login" primary={true} style={buttonStyle} onClick={this.handleSubmit} />
        </div>
      </div>
    ) 
  }
}

export {LoginUserView}
