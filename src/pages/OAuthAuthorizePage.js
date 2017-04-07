
import React from 'react'

import { Centerer } from '../components/Centerer.js'
import { OAuthAuthorizeView } from '../components/OAuthAuthorizeView.js'

//import AuthPlz from '../AuthPlz.js'

class OAuthAuthorizePage extends React.Component {

  constructor(props) {
    super(props);
    // Create form state
    this.state = {
        pending: false,
        url: "",
        requestedScopes: [],
        grantedScopes: [],
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  // Fetch pending authorizations
  getPending() {
/*
    this.setScope({
        url: pending.redirect_uri,
        state: pending.state,
        id: pending.id,
        scopes: pending.scopes,
    })
*/
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
        <OAuthAuthorizeView onSubmit={this.onSubmit} onCancel={this.onCancel} url="testurl" scopes={["a", "b", "c"]}/>
      </Centerer>
    ) 
  }
}

export {OAuthAuthorizePage}
