
import React from 'react'

import { Centerer } from '../components/Centerer.js'
import { AccountView } from '../components/AccountView.js'

import { AuthPlz } from '../AuthPlz.js'

class AccountPage extends React.Component {
constructor(props) {
    super(props);
    // Create form state
    this.state = {
      user: {},
      alert: ""
    }

    AuthPlz.Account().then((user) => {
      this.setState({user: user});
    }, (err) => {
      console.log(err)
      this.setState({alert: err})
    })
  }

  render() {
    return (
      <Centerer>
        <AccountView user={this.state.user} alert={this.state.alert}/>
      </Centerer>
    ) 
  }
}

export {AccountPage}
