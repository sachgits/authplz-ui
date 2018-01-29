import React from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';

import ScopeSelector from '../../components/ScopeSelector';
import AlertView from '../../components/AlertView';

const buttonStyle = {
    margin: 10,
};

class OAuthAuthorizeView extends React.Component {
    constructor(props) {
        super(props);

        const scopes = {};
        this.props.scopes.forEach((scope) => {
            scopes[scope] = true;
        });

    // Create form state
        this.state = {
            scopes,
        };

        this.handleScopesChange = this.handleScopesChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleScopesChange(scopes) {
        this.setState({ scopes });
    }

    handleSubmit() {
        this.props.onSubmit(this.state);
    }

    handleCancel() {
        this.props.onCancel(this.state);
    }

    render() {
        return (
            <div>
                <h1>OAuth Application Authorization</h1>
                <h2>{this.props.name}</h2>
                <p><a href={this.props.url}>{this.props.url}</a></p>

                <h3>Scopes</h3>
                <ScopeSelector
                  scopes={this.props.scopes}
                  default={false}
                  onChange={this.handleScopesChange}
                />

                <AlertView alert={this.props.alert} />

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <RaisedButton label="Cancel" style={buttonStyle} href="/#" />
                    <RaisedButton
                      label="Authorize"
                      style={buttonStyle}
                      primary
                      onClick={this.handleSubmit}
                    />
                </div>
            </div>
        );
    }
}

OAuthAuthorizeView.propTypes = {
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    alert: PropTypes.string.isRequired,
    scopes: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default OAuthAuthorizeView;
