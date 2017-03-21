import './bootstrap.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import Home from './Home/Home';
import User from './User/User';
import UserProfile from './User/UserProfile';
import UserEvents from './User/UserEvents';
import UserEventInfo from './User/UserEventInfo';
import Organizer from './CreateParty/Organizer';
import CreateParty from './CreateParty/CreateParty';
import SumUp from './SumUp/SumUp';


ReactDOM.render((
	  <Router history={browserHistory}>
	    <Route path="/" component={Home}/>
	  	<Route path="/organizer" component={Organizer}/>
	    <Route path="/create" component={CreateParty}/>
 		<Route path="/sum-up" component={SumUp}/>
 		<Route path="/user" component={User}/>
 		<Route path="/user/profile/:id" component={UserProfile}/>
 		<Route path="/user/events" component={UserEvents}/>
 		<Route path="/user/event-info/:id" component={UserEventInfo}/>
	    <Route path="*"component={Home}/>
	  </Router>
	), document.getElementById('root'))
