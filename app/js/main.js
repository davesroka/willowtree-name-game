import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';
import setGlobals from './globals.js';
import configureStore from './configure-store';

import '../scss/main.scss';
import App from 'components/app.js';
import NameGame from 'containers/name-game.js';
import Settings from 'containers/settings.js';

setGlobals();

ReactDOM.render((
  <Provider store={configureStore()}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="namegame" />
        <Route path="namegame" component={NameGame} />
        <Route path="settings" component={Settings} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('main'));




