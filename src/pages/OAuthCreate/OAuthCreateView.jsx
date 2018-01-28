import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import AlertView from '../../components/AlertView';
import ScopeSelector from '../../components/ScopeSelector';

const buttonStyle = {
    margin: 10,
};

class OAuthCreateView extends React.Component {
    constructor(props) {
        super(props);

        const scopes = {};
        this.props.scopes.forEach((scope) => {
            scopes[scope] = false;
        });

    // Create form state
        this.state = {
            name: '',
            url: '',
            grants: [],
            scopes,
            errors: {},
        };

        this.handleScopeChange = this.handleScopeChange.bind(this);
        this.handleGrantChange = this.handleGrantChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleURLChange = this.handleURLChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleScopeChange(scopes) {
        this.setState({ scopes });
    }

    handleGrantChange(grants) {
        this.setState({ grants });
    }

    handleURLChange(e) {
        this.setState({ url: e.target.value });
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
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
                <h1>OAuth Client Creation</h1>

                <TextField
                  id="name" floatingLabelText="Client Name"
                  value={this.state.name}
                  onChange={this.handleNameChange}
                  fullWidth
                  errorText={this.props.errors.name}
                />

                <TextField
                  id="url" floatingLabelText="Client URL (redirect)"
                  value={this.state.url}
                  onChange={this.handleURLChange}
                  fullWidth
                  errorText={this.props.errors.url}
                />

                <h3>Scopes</h3>
                <ScopeSelector
                  scopes={this.props.scopes}
                  default={false}
                  onChange={this.handleScopeChange}
                />

                <h3>Grants</h3>
                <ScopeSelector
                  scopes={this.props.grants}
                  default={false}
                  onChange={this.handleGrantChange}
                />

                <br /><br />

                <AlertView alert={this.props.alert} />

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <RaisedButton
                      label="Cancel"
                      style={buttonStyle}
                      href="/#"
                    />
                    <RaisedButton
                      label="Create"
                      style={buttonStyle}
                      primary
                      onClick={this.handleSubmit}
                    />
                </div>
            </div>
        );
    }
}

OAuthCreateView.propTypes = {
    scopes: PropTypes.arrayOf(PropTypes.string).isRequired,
    alert: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    grants: PropTypes.arrayOf(PropTypes.string).isRequired,
    errors: PropTypes.object,
};

export default OAuthCreateView;
