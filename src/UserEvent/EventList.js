import React, { Component } from 'react';
import { Link } from 'react-router';
import './Event.css';
import Navbar from '../Home/Navbar';
import config from '../config';

class EventList extends Component {
	constructor() {
	    super();
	    this.state = {
        dataLoaded: false
	    };

	    this.fetchEvents = this.fetchEvents.bind(this);
	}

	fetchEvents(userId) {
      fetch(`${config.apiUrl}/user/${userId}/events`,{
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
        this.setState({ userEvents: responseData.data,
                        dataLoaded: true });
      });
	}

	componentWillMount() {
    var userId = localStorage.getItem("userId");
    if(userId===null){
    	this.props.router.push({
                pathname: '/'
      	});
    }
	this.fetchEvents(userId);
  }

  openEventInformation(selectedEvent) {
    this.props.router.push({
      pathname: `/user/event-info/${selectedEvent._id}`,
      state: { 
        eventInformation: selectedEvent
      } 
    })
    console.log(selectedEvent);
  }

  deleteEvent(selectedEvent){
    var userId = localStorage.getItem("userId");
    fetch(`${config.apiUrl}/event/${selectedEvent._id}/delete`,{
          method: 'DELETE'
      })
      .then(
        response => {
              const status = response.status;
              if(status===200){
                return response.json();
              }
      })
      .then(responseData =>{
        this.fetchEvents(userId);
      });
  }




   render() {
    return (
      <div className="main-bg">
      <Navbar router={this.props.router} myaccount={true} logged={false}/>
        <div className="user-events">
          <h1 className="text-center my-events-title">Twoje wydarzenia</h1>
            <div className="user-event-list">
              <div className="jumbotron text-center">
                <div className="info-box">
                {(this.state.dataLoaded) ?
                  this.state.userEvents.map((item, itemIndex) => {
                    return (
                      <div className="page-header"> 
                        <p className="event-name">Nazwa wydarzenia: {this.state.userEvents[itemIndex].event_name}    
                            <i className="fa fa-plus open-event-info-btn" onClick={this.openEventInformation.bind(this, item)} aria-hidden="true"></i> 
                            <button className="btn fa fa-trash" onClick={this.deleteEvent.bind(this, item)}/>
                        </p>
                      </div>
                    );
                  }) : <img src="http://rpg.drivethrustuff.com/shared_images/ajax-loader.gif"/>
                }
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventList;
