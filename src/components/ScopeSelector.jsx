import React, { PropTypes } from 'react';
import Toggle from 'material-ui/Toggle';

class ScopeSelector extends React.Component {
    constructor(props) {
        super(props);

    // Parse props
        const scopes = {};
        this.props.scopes.forEach((scope) => {
            scopes[scope] = this.props.default;
        });

    // Create form state
        this.state = {
            scopes,
        };

        this.bindHandleScopeChange = this.bindHandleScopeChange.bind(this);
    }

  // Binder function for each state entry
    bindHandleScopeChange(a) {
        return function (e, toggled) {
            const scopes = this.state.scopes;
            scopes[a.scope] = toggled;
            this.setState({ scopes });

            const scopeArr = [];
            this.props.scopes.forEach((scope) => {
                if (this.state.scopes[scope] === true) {
                    scopeArr.push(scope);
                }
            });

            console.log(scopeArr);

            this.props.onChange(scopeArr);
        }.bind(this);
    }

  // Render the selectable state list
    render() {
        return (
            <div>
                {this.props.scopes.map(scope =>
                    <Toggle
                      key={scope}
                      label={scope}
                      defaultToggled={this.props.default}
                      onToggle={this.bindHandleScopeChange({ scope })}
                    />,
        )}
            </div>
        );
    }
}

// Require a scopes array and onchange function
ScopeSelector.propTypes = {
    default: PropTypes.bool.isRequired,
    scopes: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default ScopeSelector;
