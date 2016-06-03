import setGlobals from './globals.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import App from 'components/app.js';
import NameGame from 'containers/name-game.js';
import Settings from 'containers/settings.js';
import '../scss/main.scss';

setGlobals();
const loggerMiddleWare = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleWare
  )
);

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="namegame" />
        <Route path="namegame" component={NameGame} />
        <Route path="settings" component={Settings} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('main'));




