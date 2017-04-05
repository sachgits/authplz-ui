import React from 'react';


class FidoAuthorizeView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      challenge: "",
      response: "",
      message: "",
      processing: false,
    };

  }

  setMessage(m) {
    this.setState({message: m})
  }
  
  load() {
    // Request authorization challenge
    AuthPlz.GetU2FTokenAuthorize().then(handleAuthorizationRequest.bind(this), function handleError(err) {
      this.setMessage("Error fetching challenge from server")
    }.bind(this))

    function handleAuthorizationRequest(req) {
        console.log("Got authorization request")
        this.setMessage("Insert your U2F token and push the flashing button")
        this.setState({processing: true})

        // Process authorization challenge
        u2f.sign(req.appId, req.registerRequests, req.registeredKeys || [], handleAuthorizationResponse.bind(this), 60);
      }

    // Handle a authorization response from the token
    function handleAuthorizationResponse(resp) {
      console.log("Got registration response")
      console.log(resp)
      this.setState({processing: false})

      // Check for errors
      if(typeof resp.errorCode !== 'undefined') {
        console.log("Error: " + resp.errorMessage)

        this.setMessage("U2F Enrolment error")
        return
      }

      // Return response
      AuthPlz.PostU2FTokenEnrolment(resp).then(function registrationSuccess(res) {
        console.log("Enrolment complete")
        this.setMessage(res)
        
      }.bind(this), function RegistrationError(err) {
        console.log(err)
        this.setMessage(err)
      }.bind(this))
    }


  }

  render() {
    return (
      <div>
        <p>Please insert your U2F / Fido token and press the button if available</p>
        <CircularProgress hidden={!this.state.processing}/>
        <p hidden={!this.state.message}>{this.state.message}</p>
      </div>
    );
  }
}

export { FidoAuthorizeView }