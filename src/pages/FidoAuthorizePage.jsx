import React from 'react';

import Centerer from '../components/Centerer';
import FidoAuthorizeView from '../components/FidoAuthorizeView';

import { AuthPlz } from '../AuthPlz';
import { u2f } from '../lib/u2f-api';

class FidoAuthorizePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            challenge: '',
            response: '',
            error: '',
            pending: false,
            retry: false,
            done: false,
        };
    }

    componentDidMount() {
    // Request authorization challenge
        AuthPlz.GetU2FTokenAuthorize().then(this.handleAuthorizationRequest, (error) => {
            console.log('GetU2FTokenAuthorize Error');
            console.log(error);
            this.setState({ error, retry: false, pending: false, done: false });
        });
    }

    onRetry() {
        this.handleAuthorizationRequest(this.state.request);
    }

    handleAuthorizationRequest(req) {
        console.log('Got authorization request');

        this.setState({ pending: true, retry: false, done: false, error: '', request: req });

    // Process authorization challenge
        u2f.sign(
          req.appId,
          req.challenge,
          req.registeredKeys || [],
          this.handleAuthorizationResponse,
          10);
    }

  // Handle a authorization response from the token
    handleAuthorizationResponse(resp) {
        console.log('Got authorization response');
        console.log(resp);

    // Check for errors
        if (typeof resp.errorCode !== 'undefined') {
            let message = 'U2F Internal Error';
            switch (resp.errorCode) {
            case 1: message = resp.errorMessage; break;
            case 2: message = 'Bad U2F Request'; break;
            case 3: message = 'U2F Configuration Unsupported'; break;
            case 4: message = 'U2F Device ineligible'; break;
            case 5: message = 'U2F Request Timeout'; break;
            default: message = 'U2F Unknown Error';
            }

            console.log(`Error: ${message}`);
            this.setState({ pending: false, retry: true, error: message });
            return;
        }

    // Return response to server
        AuthPlz.PostU2FTokenAuthorize(resp).then(() => {
            console.log('Authorization complete');
            this.setState({ pending: false, done: true });
        }, (err) => {
            console.log(err);
            this.setState({ pending: false, retry: true, error: err });
        });
    }

    render() {
        return (
            <Centerer>
                <FidoAuthorizeView
                  pending={this.state.pending}
                  done={this.state.done}
                  retry={this.state.retry}
                  onRetry={this.onRetry}
                  error={this.state.error}
                />
            </Centerer>
        );
    }
}

export default FidoAuthorizePage;
