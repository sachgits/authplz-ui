import React from 'react';

import { Centerer } from '../components/Centerer';
import { FidoRegisterView } from '../components/FidoRegisterView';

import { AuthPlz } from '../AuthPlz';
import { u2f } from '../lib/u2f-api';

class FidoRegisterPage extends React.Component {

    constructor(props) {
        super(props);
    // Create form state
        this.state = {
            name: '',
            error: '',
            pending: false,
            retry: false,
            stateIndex: 0,
            done: false,
            request: {},
        };
    }

    onSubmit(viewState) {
    // Request registration
        AuthPlz.GetU2FTokenEnrolment(viewState.name).then((req) => {
            console.log('Got registration request');
            console.log(req);
            u2f.register(req.appId,
              req.registerRequests,
              req.registeredKeys || [],
              this.handleRegistrationResponse,
              10);
            this.setState({ stateIndex: 1, pending: true, retry: false, request: req });
        }, () => {
            this.setState({ error: 'Error fetching challenge from server' });
        });
    }

    // Handle form changes
    onRetry() {
        const req = this.state.request;
        u2f.register(
          req.appId,
          req.registerRequests,
          req.registeredKeys || [],
          this.handleRegistrationResponse,
          60);
        this.setState({ stateIndex: 1, error: '', pending: true, retry: false, request: req });
    }

    onCancel() {
        this.setState({ stateIndex: 0, pending: false });
    }

    // Handle a registration response from the token
    handleRegistrationResponse(resp) {
        console.log('Got registration response');

        // Check for errors
        if (typeof resp.errorCode !== 'undefined') {
            console.log(resp);

            let message = 'U2F Internal Error';
            switch (resp.errorCode) {
            case 1: message = resp.errorMessage; break;
            case 2: message = 'Bad U2F Request'; break;
            case 3: message = 'U2F Configuration Unsupported'; break;
            case 4: message = 'U2F Device ineligible'; break;
            case 5: message = 'U2F Request Timeout'; break;
            default: message = 'U2F Unknown Error';
            }

            this.setState({ pending: false, retry: true, error: message });
            return;
        }

        // Return response to server
        AuthPlz.PostU2FTokenEnrolment(resp).then(() => {
            console.log('Enrolment complete');
            this.setState({ done: true, stateIndex: 2 });
        }, (err) => {
            console.log(err);
            this.setState({ pending: false, error: 'Error posting enrolment to server' });
        });
    }

    render() {
        return (
            <Centerer>
                <FidoRegisterView
                  onSubmit={this.onSubmit}
                  onCancel={this.onCancel}
                  retry={this.state.retry}
                  onRetry={this.onRetry}
                  stepIndex={this.state.stateIndex}
                  waiting={this.state.pending}
                  error={this.state.error}
                  done={this.state.done}
                />
            </Centerer>
        );
    }
}

export default FidoRegisterPage;
