import React, { PureComponent } from 'react';

import OAuthAuthorizeView from './OAuthAuthorizeView';

import AuthPlz from '../../AuthPlz';

const onCancel = () => {
    console.log('Cancelled authorization');
};

class OAuthAuthorizePage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = { 
            pending: false,
            url: 'fakeURL',
            name: 'fakeName',
            requestedScopes: ['abc', '123'],
            grantedScopes: [],
            error: '',
            done: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.getPending();
    }

    onSubmit(childState) {
        console.log('Submitting authorization');
        console.log(childState);

        AuthPlz.PostAuthorizationAccept(true, this.state.state, childState.scopes).then(() => {
            this.setState({ done: true });
            this.setState({ error: 'Authorization post successful' });
        }, () => {
            this.setState({ error: 'Error posting authorization' });
        });
    }

    // Fetch pending authorizations
    getPending() {
        AuthPlz.GetPendingAuthorization().then((resp) => {
            this.setState({
                pending: true,
                url: resp.redirect_uri,
                state: resp.state,
                name: resp.name,
                id: resp.id,
                requestedScopes: resp.scopes,
            });
        }, () => {
            this.setState({ error: 'Error fetching pending authorization' });
        });
    }

    render() {
        return (
            <div>
                <div hidden={this.state.pending}>
                    <p>No pending authorizations found</p>
                </div>
                <div hidden={!this.state.pending || this.state.done}>
                    <OAuthAuthorizeView
                      onSubmit={this.onSubmit}
                      onCancel={onCancel}
                      name={this.state.name}
                      url={this.state.url}
                      scopes={this.state.requestedScopes}
                      alert={this.state.error}
                    />
                </div>
                <div hidden={!this.state.done}>
                    <p>Client authorization complete</p>
                </div>
            </div>
        );
    }
}

export default OAuthAuthorizePage;
