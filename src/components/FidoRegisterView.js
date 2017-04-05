import React from 'react';

import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

import WarningIcon from 'material-ui/svg-icons/alert/warning';
import {red500} from 'material-ui/styles/colors';

import { AlertView } from '../components/AlertView.js'

const buttonStyle = {
  margin: 10,
};

class FidoRegisterView extends React.Component {
  constructor(props) {
    super(props);

    // Create form state
    this.state = {
      name: "",
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };


  handleSubmit(event) {
    this.props.onSubmit(this.state)
  }

  handleNameChange(e) {
    this.setState({name: e.target.value})
  }

  render() {
    return (
      <div onKeyPress={this._handleKeyPress}>
          <Stepper activeStep={this.props.stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Enter a name for the new U2F Token</StepLabel>
            <StepContent>
              <TextField id="name" floatingLabelText="Name" 
                value={this.state.name}
                onChange={this.handleNameChange}
                fullWidth={true}
              />
              <AlertView alert={this.props.error} />
              <RaisedButton label="Register" primary={true} onClick={this.handleSubmit} />
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Insert your security key</StepLabel>
            <StepContent>
              <p>If your device has a button please press it, otherwise remove and reinsert the device</p>
               <br /> <br />
               <div hidden={!this.props.waiting}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <CircularProgress />
                </div>
              </div>
              <AlertView alert={this.props.error} />
              <div hidden={!this.props.retry}>
                <RaisedButton label="Retry" primary={true} style={buttonStyle} onClick={this.props.onRetry} />
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
  stepIndex: React.PropTypes.number.isRequired,
  waiting: React.PropTypes.bool.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  retry: React.PropTypes.bool.isRequired,
  onRetry: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  done: React.PropTypes.bool.isRequired,
}

export { FidoRegisterView }