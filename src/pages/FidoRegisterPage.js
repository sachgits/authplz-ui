
import React from 'react'

import { Centerer } from '../components/Centerer.js'
import { FidoRegisterView } from '../components/FidoRegisterView.js'

import { AuthPlz } from '../AuthPlz.js'
import { u2f } from '../u2f-api.js'

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
    }
  }


  // Handle a registration response from the token
  handleRegistrationResponse = (resp) => {
    console.log("Got registration response")

    // Check for errors
    if(typeof resp.errorCode !== 'undefined') {
      console.log(resp)

      let message = "U2F Internal Error"
      switch (resp.errorCode) {
        case 1: message = resp.errorMessage; break
        case 2: message = "Bad U2F Request"; break
        case 3: message = "U2F Configuration Unsupported"; break
        case 4: message = "U2F Device ineligible"; break
        case 5: message = "U2F Request Timeout"; break
        default: message = "U2F Unknown Error"
      }

      this.setState({pending: false, retry: true, error: message})  
      return
    }

    // Return response to server
    AuthPlz.PostU2FTokenEnrolment(resp).then(function registrationSuccess(res) {
      console.log("Enrolment complete")
      this.setState({done: true, stateIndex: 2})
      
    }.bind(this), function RegistrationError(err) {
      console.log(err)
      this.setState({pending: false, error: "Error posting enrolment to server"})  
    }.bind(this))
  }

  onSubmit = (viewState) => {
    // Request registration
    AuthPlz.GetU2FTokenEnrolment(viewState.name).then(function handleEnrolment(req) {
      console.log("Got registration request")
      console.log(req)
      u2f.register(req.appId, req.registerRequests, req.registeredKeys || [], this.handleRegistrationResponse, 10);
      this.setState({stateIndex: 1, pending: true, retry: false, request: req})  
    }.bind(this), function handleError(err) {
      this.setState({error: "Error fetching challenge from server"})
    }.bind(this))

  }

    // Handle form changes
  onRetry = (e) => {
    let req = this.state.request
    u2f.register(req.appId, req.registerRequests, req.registeredKeys || [], this.handleRegistrationResponse, 60);
    this.setState({stateIndex: 1, error: "", pending: true, retry: false, request: req})  
  }

  onCancel = () => {
    this.setState({stateIndex: 0, pending: false})
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
    ) 
  }
}

export {FidoRegisterPage}
