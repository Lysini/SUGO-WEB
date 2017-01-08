import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import Home from './Home';
import CreateParty from './CreateParty';
import SumUp from './SumUp';
import './index.css';

ReactDOM.render((
	  <Router history={browserHistory}>
	    <Route path="/" component={Home}/>
	    <Route path="/create" component={CreateParty}/>
 		<Route path="/sum-up" component={SumUp}/>
	    <Route path="*" component={Home}/>
	  </Router>
	), document.getElementById('root'))
