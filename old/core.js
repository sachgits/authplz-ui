import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router'
import { BrowserHistory } from 'react-history'

import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import '../scss/main.scss';

import injectTapEventPlugin from 'react-tap-event-plugin';

import { LoginForm } from './loginform.jsx'
import { CreateUserForm } from './createform.jsx'
import { AccountView } from './accountview.jsx'
import { AddTokenForm } from './addtokenform.jsx'
import { OAuthAuthorizeForm } from './oauthform.jsx'

injectTapEventPlugin();

// Then we delete a bunch of code from App and
// add some <Link> elements...
const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        {/* change the <a>s to <Link>s */}
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/create">Create User</Link></li>
          <li><Link to="/account">View Account</Link></li>
          <li><Link to="/u2f-enrol">Enrol U2F</Link></li>
          <li><Link to="/oauth-authorize">Authorize OAuth</Link></li>
        </ul>

        {/*
          next we replace `<Child>` with `this.props.children`
          the router will figure out the children for us
        */}
        {this.props.children}
      </div>
    )
  }
})

// Finally, we render a <Router> with some <Route>s.
// It does all the fancy routing stuff for us.
render((
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="login" component={LoginForm} />
      <Route path="create" component={CreateUserForm} />
      <Route path="account" component={AccountView} />
      <Route path="u2f-enrol" component={AddTokenForm} />
      <Route path="oauth-authorize" component={OAuthAuthorizeForm} />

    </Route>
  </Router>
  </MuiThemeProvider>
), document.getElementById('react-root'))