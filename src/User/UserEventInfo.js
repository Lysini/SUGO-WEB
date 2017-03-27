import React, { Component } from 'react';
import { Link } from 'react-router';
import './User.css';
import Navbar from '../Home/Navbar';
import config from '../config';
import EventInfoPlace from './EventInfoPlace';
import EventInfoPeople from './EventInfoPeople';
import EventInfoStuff from './EventInfoStuff';

class UserEventInfo extends Component {
	constructor() {
	    super();
	    this.state = {
        	dataLoaded: false,
          showPageNumber: 0,
          placeLocation: '',
          editMode: false,
	    };
	}

  fetchEvent() {
      var eventId = this.props.params.id;
      fetch(`${config.apiUrl}/event/${eventId}`,{
          method: 'GET'
      })
      .then(
        response => {
              const status = response.status;
              if(status===200){
                return response.json();
              }
      })
      .then(responseData =>{
        console.log(responseData);
        this.setState({
                        eventId: responseData.data._id,
                        eventName: responseData.data.event_name,
                        people: responseData.data.people,
                        place: responseData.data.place,
                        special_info: responseData.data.special_info,
                        stuff: responseData.data.stuff,
                        dataLoaded: true });
      });
  }

  componentWillMount() {
    this.fetchEvent();
  }

render() {
    return (
      <div className="main-bg">
      <Navbar myaccount={true} router={this.props.router}/>
        {
        (this.state.dataLoaded) ?
        <div className="user-event-info">
           <h1 className="text-center">{this.state.eventName}</h1>
           <nav className="navbar navbar-default event-info-navbar">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#" onClick={() => this.setState({showPageNumber: 0})}>Miejsce</a></li>
                <li><a href="#" onClick={() => this.setState({showPageNumber: 1})}>Osoby</a></li>
                <li><a href="#" onClick={() => this.setState({showPageNumber: 2})}>Prowiant</a></li>
              </ul>
            </div>
          </nav>
            <div className="container">
                    {(this.state.showPageNumber === 0) ?
                      <EventInfoPlace place={this.state.place} special_info={this.state.special_info} reFetchEvent={this.fetchEvent.bind(this)} eventId={this.props.params.id}/>
                      : null
                    }
                    {(this.state.showPageNumber === 1) ?
                      <EventInfoPeople people={this.state.people} reFetchEvent={this.fetchEvent.bind(this)} eventId={this.props.params.id}/>
                    : null }
                    {(this.state.showPageNumber === 2) ?
                      <EventInfoStuff stuff={this.state.stuff} reFetchEvent={this.fetchEvent.bind(this)} eventId={this.props.params.id}/>
                    : null 
                    }
              </div>
          </div>
        : <img src="http://rpg.drivethrustuff.com/shared_images/ajax-loader.gif"/>}
      </div>
    );
  }
}

export default UserEventInfo;
