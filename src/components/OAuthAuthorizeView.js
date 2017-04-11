
import React from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';


import { ScopeSelector } from '../components/ScopeSelector.js'
import { AlertView } from '../components/AlertView.js'

const buttonStyle = {
  margin: 10,
};

class OAuthAuthorizeView extends React.Component {
  constructor(props) {
    super(props);

    let scopes = {}
    this.props.scopes.forEach(function(scope) {
      scopes[scope] = true
    })

    // Create form state
    this.state = {
      scopes: scopes
    }

    this.handleScopesChange = this.handleScopesChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleScopesChange(scopes) {
    this.setState({scopes: scopes})
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
        <h1>OAuth Application Authorization</h1>
        <h3>{this.props.name}</h3>
        <p><a href={this.props.url}>{this.props.url}</a></p>

        <h3>Scopes</h3>
        <ScopeSelector scopes={this.props.scopes} default={false} onChange={this.handleScopesChange} />

        <br /><br />
         <AlertView alert={this.props.alert} />

        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <RaisedButton label="Cancel" style={buttonStyle} href="/#" />
          <RaisedButton label="Authorize" style={buttonStyle} primary={true} onClick={this.handleSubmit} />
        </div>
      </div>
    ) 
  }
}

OAuthAuthorizeView.propTypes = {
  url: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  alert: React.PropTypes.string.isRequired,
  scopes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
}

export {OAuthAuthorizeView}
