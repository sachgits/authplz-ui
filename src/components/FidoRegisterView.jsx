import React, { PropTypes } from 'react';

import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

import AlertView from '../components/AlertView';

const buttonStyle = {
    margin: 10,
};

class FidoRegisterView extends React.Component {
    constructor(props) {
        super(props);

    // Create form state
        this.state = {
            name: '',
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleSubmit();
        }
    }

    handleSubmit() {
        this.props.onSubmit(this.state);
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    render() {
        return (
            <div>
                <Stepper activeStep={this.props.stepIndex} orientation="vertical">
                    <Step onKeyPress={this.handleKeyPress}>
                        <StepLabel>Enter a name for the new U2F Token</StepLabel>
                        <StepContent>
                            <TextField
                              id="name" floatingLabelText="Name"
                              value={this.state.name}
                              onChange={this.handleNameChange}
                              fullWidth
                            />
                            <AlertView alert={this.props.error} />
                            <RaisedButton label="Register" primary onClick={this.handleSubmit} />
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Insert your security key</StepLabel>
                        <StepContent>
                            <p>If your device has a button please press it,
                                otherwise remove and reinsert the device</p>
                            <br /> <br />
                            <div hidden={!this.props.waiting}>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <CircularProgress />
                                </div>
                            </div>
                            <AlertView alert={this.props.error} />
                            <div hidden={!this.props.retry}>
                                <RaisedButton
                                  label="Retry"
                                  primary
                                  style={buttonStyle}
                                  onClick={this.props.onRetry}
                                />
                            </div>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel completed={this.props.done}>U2F Registration Complete</StepLabel>
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

FidoRegisterView.propTypes = {
    stepIndex: PropTypes.number.isRequired,
    waiting: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    retry: PropTypes.bool.isRequired,
    onRetry: PropTypes.func.isRequired,
    done: PropTypes.bool.isRequired,
    error: PropTypes.object,
};

export default FidoRegisterView;
