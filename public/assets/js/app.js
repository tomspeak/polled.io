import React from 'react';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';

import App from './components/App.jsx';
import Index from './components/Index.jsx';
import Poll from './components/Poll.jsx';
import NoMatch from './components/NoMatch.jsx';

React.render((
  <Router history={history}>
    <Route component={App}>
      <Route path="/" component={Index} />
      <Route path="poll" component={Poll} />
    </Route>
    <Route path="*" component={NoMatch}/>
  </Router>
), document.body);
