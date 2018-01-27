import React from 'react';

import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

import AlertView from '../../components/AlertView';

import AuthPlz from '../../AuthPlz';
import { u2f } from '../../lib/u2f-api';

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

        this.handleNameChange = this.handleNameChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    onSubmit() {
    // Request registration
        AuthPlz.GetU2FTokenEnrolment(this.state.name).then((req) => {
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

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.onSubmit();
        }
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    render() {
        return (
            <div>
                <Stepper activeStep={this.state.stateIndex} orientation="vertical">
                    <Step onKeyPress={this.handleKeyPress}>
                        <StepLabel>Enter a name for the new U2F Token</StepLabel>
                        <StepContent>
                            <TextField
                              id="name" floatingLabelText="Name"
                              value={this.state.name}
                              onChange={this.handleNameChange}
                              fullWidth
                            />
                            <AlertView alert={this.state.error} />
                            <RaisedButton label="Register" primary onClick={this.onSubmit} />
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Insert your security key</StepLabel>
                        <StepContent>
                            <p>If your device has a button please press it,
                                otherwise remove and reinsert the device</p>
                            <br /> <br />
                            <div hidden={!this.state.pending}>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <CircularProgress />
                                </div>
                            </div>
                            <AlertView alert={this.state.error} />
                            <div hidden={!this.state.retry}>
                                <RaisedButton
                                  label="Retry"
                                  primary
                                  style={{ margin: '10px' }}
                                  onClick={this.onRetry}
                                />
                            </div>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel completed={this.state.done}>U2F Registration Complete</StepLabel>
                        <StepContent>
                            <p>
                                Successfully enrolled device: {this.state.name}
                            </p>
                        </StepContent>
                    </Step>
                </Stepper>

            </div>
        );
    }
}

export default FidoRegisterPage;
