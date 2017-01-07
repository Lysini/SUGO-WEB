import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import App from './App';
import CreateParty from './CreateParty';
import './index.css';

ReactDOM.render((
	  <Router history={browserHistory}>
	    <Route path="/" component={App}>
	      <Route path="create" component={CreateParty}/>
	      <Route path="*" component={App}/>
	    </Route>
	  </Router>
	), document.getElementById('root'))
