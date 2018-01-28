import React from 'react';
import ReactDOM from 'react-dom';

import { IntlProvider } from 'react-intl';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Router } from 'react-router';

import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

ReactDOM.render(
    <IntlProvider locale="en">
        <Router history={history}>
            <App />
        </Router>
    </IntlProvider>
    , document.getElementById('root'),
);
registerServiceWorker();
