
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
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount = () => {
    //this.getPending()
  }

  // Fetch pending authorizations
  getPending() {
    AuthPlz.GetPendingAuthorization().then((resp) => {
       this.setState({
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

  onSubmit(scope) {
    console.log("Submitting authorization")
    console.log(scope)
  }
    
  onCancel() {
     console.log("Cancelled authorization")
  }

  render() {
    return (
      <Centerer>
        <OAuthAuthorizeView 
          onSubmit={this.onSubmit} 
          onCancel={this.onCancel} 
          name={this.state.name} 
          url={this.state.url} 
          scopes={this.state.requestedScopes}
          alert={this.state.error}
        />
      </Centerer>
    ) 
  }
}

export {OAuthAuthorizePage}
