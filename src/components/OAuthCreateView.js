
import React from 'react'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { AlertView } from '../components/AlertView.js'
import { ScopeSelector } from '../components/ScopeSelector.js'

const buttonStyle = {
  margin: 10,
};

class OAuthCreateView extends React.Component {
  constructor(props) {
    super(props);

    let scopes = {}
    this.props.scopes.forEach(function(scope) {
      scopes[scope] = false
    })
    
    // Create form state
    this.state = {
      name: "",
      url: "",
      grants: [],
      scopes: scopes,
      errors: {},
    }

    this.handleScopeChange = this.handleScopeChange.bind(this);
    this.handleGrantChange = this.handleGrantChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleURLChange = this.handleURLChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleScopeChange(scopes) {
    this.setState({scopes: scopes})
  }

  handleGrantChange(grants) {
    this.setState({grants: grants})
  }

  handleURLChange(e) {
    this.setState({url: e.target.value})
  }

  handleNameChange(e) {
    this.setState({name: e.target.value})
  }

  handleSubmit() {
    this.props.onSubmit(this.state)
  }

  handleCancel() {
    this.props.onCancel(this.state)
  }

  render() {
    return (
      <div>
        <h1>OAuth Client Creation</h1>

        <TextField id="name" floatingLabelText="Client Name" 
          value={this.state.name}
          onChange={this.handleNameChange}
          fullWidth={true}
          errorText={this.props.errors.name}
        />
        
        <TextField id="url" floatingLabelText="Client URL (redirect)" 
          value={this.state.url}
          onChange={this.handleURLChange}
          fullWidth={true}
          errorText={this.props.errors.url}
        />
        
        <h3>Scopes</h3>
        <ScopeSelector scopes={this.props.scopes} default={false} onChange={this.handleScopeChange} />

        <h3>Grants</h3>
        <ScopeSelector scopes={this.props.grants} default={false} onChange={this.handleGrantChange} />

        <br /><br />

        <AlertView alert={this.props.alert} />

        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <RaisedButton label="Cancel" style={buttonStyle} href="/#" />
          <RaisedButton label="Create" style={buttonStyle} primary={true} onClick={this.handleSubmit} />
        </div>
      </div>
    ) 
  }
}

OAuthCreateView.propTypes = {
  scopes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  alert: React.PropTypes.string.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
}

export {OAuthCreateView}
