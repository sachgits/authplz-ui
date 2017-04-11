
import React from 'react'

import validator from 'validator';

import { Centerer } from '../components/Centerer.js'
import { OAuthCreateView } from '../components/OAuthCreateView.js'
import { OAuthClientView } from '../components/OAuthClientView.js'

import { AuthPlz } from '../AuthPlz.js'

console.log(AuthPlz)

class OAuthCreatePage extends React.Component {

  constructor(props) {
    super(props);
    // Create form state
    this.state = {
        name: "",
        url: "",
        grants: [],
        scopes: [],
        error: "",
        result: "",
        client: {
          scopes: [],
          grants: [],
          redirects: [],
        },
        errors: {},
        clientLoaded: false,
    }

    this.loadOptions = this.loadOptions.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  // Validate the child component state
  validate(state) {
    let errors = {}

    // Errors shown after submitted state is set
    if (state.submitted) {

      // TODO: could / should? validate username existence here
      if ((typeof state.username === "name") || (state.username.length === 0)) {
        errors.username = "client name required"
      } else if (!validator.isAlphanumeric(state.username)) {
        errors.username = "client must consist of alphanumeric characters (and spaces)"
      } else {
        delete errors.username
      }

      if ((typeof state.url === "undefined") || (state.url.length === 0)) {
        errors.url = "client url required"
      } else if (!validator.isURL(state.url)) {
        errors.url = "url must be of the form: https://authplz.herokuapp.com/auth"
      } else {
        delete errors.url
      }

    }

    return errors
  }

  componentDidMount = () => {
    console.log("Mount")
    this.loadOptions()
  }

  loadOptions = () => {
    AuthPlz.GetOAuthOptions().then(function(res){
      console.log("Get oauth options")
      console.log(res)
      this.setState({
        scopes: res.scopes,
        grants: res.grants
      })
    }.bind(this), function(err){
      console.log("Get oauth options error")
      console.log(err)
      this.setState({error: err})
    }.bind(this))
  }

  // Called on submission of the child component (with no errors)
  onSubmit = (state) => {

    console.log(state)

    let errors = this.validate(state)
    if ((typeof errors !== "undefined") && (Object.keys(errors).length !== 0)) {
      return this.setState({errors: errors})
    }
    

    AuthPlz.CreateOauthClient(state.name, state.url, state.scopes, state.grants)
    .then(function(res) {
      this.setState({client: res, clientLoaded: true})

    }.bind(this), function(res) {
      if (typeof res.message !== "undefined") {
        this.setState({result: res.message})
      } else {
        this.setState({result: res})
      }
      console.log(res)
    }.bind(this))
  }

  onCancel = (state) => {

  }

  render() {
    return (
      <Centerer>
        <div hidden={this.state.clientLoaded}>
         <OAuthCreateView 
          scopes={this.state.scopes}
          grants={this.state.grants} 
          alert={this.state.error}
          errors={this.state.errors}
          validate={this.validate}
          onSubmit={this.onSubmit} 
          onCancel={this.onCancel}
        />
      </div>
      <div hidden={!this.state.clientLoaded}>
        <OAuthClientView
          client={this.state.client}
        />
      </div>
    </Centerer>
    ) 
  }
}

export {OAuthCreatePage}
