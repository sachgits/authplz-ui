
import React from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

const buttonStyle = {
  margin: 10,
};

class OAuthAuthorizeView extends React.Component {
  constructor(props) {
    super(props);

    let scopes = {}
    this.props.scopes.forEach(function(scope) {
      scopes[scope] = true
    }.bind(this))

    // Create form state
    this.state = {
      scopes: scopes
    }

    this.bindHandleScopeChange = this.bindHandleScopeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  bindHandleScopeChange(a) {
    return function(e, toggled) {
      let scopes = this.state.scopes
      scopes[a.scope] = toggled
      this.setState({scopes: scopes})
    }.bind(this)
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
        <h3>URL</h3>
        <p>{this.props.url}</p>

        <h3>Scopes</h3>
        {this.props.scopes.map((scope) =>
          <Toggle 
            key={scope}
            label={scope}
            defaultToggled={true}
            onToggle={this.bindHandleScopeChange({scope})}
          />
        )}

        <br /><br />
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
  scopes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
}

export {OAuthAuthorizeView}
