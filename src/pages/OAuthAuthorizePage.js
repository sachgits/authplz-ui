
import React from 'react'

import { Centerer } from '../components/Centerer.js'
import { OAuthAuthorizeView } from '../components/OAuthAuthorizeView.js'

import { AuthPlz } from '../AuthPlz.js'

class OAuthAuthorizePage extends React.Component {

  constructor(props) {
    super(props);
    // Create form state
    this.state = {
        pending: false,
        url: "fakeURL",
        name: "fakeName",
        requestedScopes: ["abc", "123"],
        grantedScopes: [],
        error: "",
        done: false,
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount = () => {
    this.getPending()
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
      })

    }, (err) => {
      this.setState({error: "Error fetching pending authorization"})
    }) 
  }

  onSubmit(childState) {
    console.log("Submitting authorization")
    console.log(childState)
    
    AuthPlz.PostAuthorizationAccept(true, this.state.state, childState.scopes).then((resp) => {
       this.setState({done: true})
       this.setState({error: "Authorization post successful"})
    }, (err) => {
        this.setState({error: "Error posting authorization"})
    }) 
  }
    
  onCancel() {
     console.log("Cancelled authorization")
  }

  render() {
    return (
      <Centerer>
        <div hidden={this.state.pending}>
          <p>No pending authorizations found</p>
        </div>
        <div hidden={!this.state.pending || this.state.done}>
          <OAuthAuthorizeView 
            onSubmit={this.onSubmit} 
            onCancel={this.onCancel} 
            name={this.state.name} 
            url={this.state.url} 
            scopes={this.state.requestedScopes}
            alert={this.state.error}
          />
        </div>
        <div hidden={!this.state.done}>
          <p>Client authorization complete</p>
        </div>
      </Centerer>
    ) 
  }
}

export {OAuthAuthorizePage}
