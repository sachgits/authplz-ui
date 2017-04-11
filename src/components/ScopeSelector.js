
import React from 'react'

import Toggle from 'material-ui/Toggle';

class ScopeSelector extends React.Component {
  constructor(props) {
    super(props);

    // Parse props
    let scopes = {}
    this.props.scopes.forEach(function(scope) {
      scopes[scope] = this.props.default
    })

    // Create form state
    this.state = {
      scopes: scopes
    }

    this.bindHandleScopeChange = this.bindHandleScopeChange.bind(this);
  }

  // Binder function for each state entry
  bindHandleScopeChange(a) {
    return function(e, toggled) {
        let scopes = this.state.scopes
        scopes[a.scope] = toggled
        this.setState({scopes: scopes})

        let scopeArr = []
        this.props.scopes.forEach((scope) => {
            if (this.state.scopes[scope] === true) {
                scopeArr.push(scope)
            }
        })

        console.log(scopeArr)

        this.props.onChange(scopeArr)
    }.bind(this)
  }

  // Render the selectable state list
  render() {
    return (
      <div>
        {this.props.scopes.map((scope) =>
          <Toggle 
            key={scope}
            label={scope}
            defaultToggled={this.props.default}
            onToggle={this.bindHandleScopeChange({scope})}
          />
        )}
      </div>
    ) 
  }
}

// Require a scopes array and onchange function
ScopeSelector.propTypes = {
  default: React.PropTypes.bool.isRequired,
  scopes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  onChange: React.PropTypes.func.isRequired,
}

export {ScopeSelector}
