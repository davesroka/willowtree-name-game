import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';

import App from 'components/app.js';
import Game from 'components/game.js';
import '../scss/main.scss';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRedirect to="/game" />
      <Route path="game" component={Game} />
    </Route>
  </Router>
), document.getElementById('main'));




