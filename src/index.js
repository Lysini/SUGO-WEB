import './bootstrap.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import Home from './Home/Home';
import UserProfile from './UserProfile/UserProfile';
import PublicProfile from './UserProfile/PublicProfile';
import EventList from './UserEvent/EventList';
import EventInfo from './UserEvent/EventInfo';
import Organizer from './CreateParty/Organizer';
import CreateParty from './CreateParty/CreateParty';


ReactDOM.render((
	  <Router history={browserHistory}>
	    <Route path="/" component={Home}/>
	  	<Route path="/organizer" component={Organizer}/>
	    <Route path="/create" component={CreateParty}/>
 		<Route path="/user" component={UserProfile}/>
 		<Route path="/user/profile/:id" component={PublicProfile}/>
 		<Route path="/user/events" component={EventList}/>
 		<Route path="/user/event-info/:id" component={EventInfo}/>
	    <Route path="*"component={Home}/>
	  </Router>
	), document.getElementById('root'))
