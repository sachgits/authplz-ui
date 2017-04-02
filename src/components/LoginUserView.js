
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
      errors: {}
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit(this.state)
    }
  }

  handleEmailChange(e) {
    let state = this.state
    state.email = e.target.value
    this.setState({email: e.target.value, errors: this.props.validate(state)})
  }

  handlePasswordChange(e) {
    let state = this.state
    state.password = e.target.value
    this.setState({password: e.target.value, errors: this.props.validate(this.state)})
  }

  handleSubmit(event) {
    let state = this.state
    state.submitted = true

    let errors = this.props.validate(state)
    this.setState({submitted: true, errors: errors})

    if ((typeof errors === "undefined") || (Object.keys(errors).length === 0)) {
      this.props.onSubmit(this.state)
    }
  }

  render() {
    return (
      <div>
        <TextField id="email" floatingLabelText="Email" 
          value={this.state.email}
          onChange={this.handleEmailChange}
          fullWidth={true}
          errorText={this.state.errors.email}
        />

        <TextField id="password" floatingLabelText="Password" 
          value={this.state.password}
          type="password"
          onChange={this.handlePasswordChange}
          fullWidth={true}
          errorText={this.state.errors.password}
        />
        
        <br /><br />
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <RaisedButton label="Create Account" style={buttonStyle} href="/#/create" />
            <RaisedButton label="Login" primary={true} style={buttonStyle} onClick={this.handleSubmit} />
        </div>

        <div hidden={this.state.errors.message === ""} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          {this.state.errors.message}
        </div>
      </div>
    ) 
  }
}

LoginUserView.propTypes = {
  validate: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
}

export {LoginUserView}
