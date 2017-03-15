import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import Home from './Home/Home';
import User from './User/User';
import UserEvents from './User/UserEvents';
import UserEventInfo from './User/UserEventInfo';
import Organizer from './CreateParty/Organizer';
import CreateParty from './CreateParty/CreateParty';
import SumUp from './SumUp/SumUp';
import './index.css';


ReactDOM.render((
	  <Router history={browserHistory}>
	    <Route path="/" component={Home}/>
	  	<Route path="/organizer" component={Organizer}/>
	    <Route path="/create" component={CreateParty}/>
 		<Route path="/sum-up" component={SumUp}/>
 		<Route path="/user" component={User}/>
 		<Route path="/user/events" component={UserEvents}/>
 		<Route path="/user/event-info" component={UserEventInfo}/>
	    <Route path="*"component={Home}/>
	  </Router>
	), document.getElementById('root'))
