import React from 'react'
import { HashRouter, Route, Link } from 'react-router-dom';
import { BrowserHistory } from 'react-history'

import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './App.scss';

import { CreateUserPage } from './pages/CreateUserPage.js'

import { LoginUserPage } from './pages/LoginUserPage.js'

injectTapEventPlugin();

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
        <div>
        <h1>AuthPlz</h1>
        <HashRouter history={BrowserHistory}>
          <div>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/create">Create User</Link></li>
          </ul>
          <Route path="/create" component={CreateUserPage} />
          <Route path="/login" component={LoginUserPage} />
          </div>
        </HashRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
