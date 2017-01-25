import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import Home from './Home/Home';
import CreateParty from './CreateParty/CreateParty';
import SumUp from './SumUp/SumUp';
import './index.css';
import '../public/css/style.css';

ReactDOM.render((
	  <Router history={browserHistory}>
	    <Route path="/" component={Home}/>
	    <Route path="/create" component={CreateParty}/>
 		<Route path="/sum-up" component={SumUp}/>
	    <Route path="*" component={Home}/>
	  </Router>
	), document.getElementById('root'))
