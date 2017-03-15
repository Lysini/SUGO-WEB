import React, { Component } from 'react';
import { Link } from 'react-router';
import './User.css';
import Navbar from '../Home/Navbar';

class UserEvents extends Component {
	constructor() {
	    super();
	    this.state = {
        dataLoaded: false
	    };

	    this.fetchEvents = this.fetchEvents.bind(this);
	}

  logOut(){
      localStorage.removeItem("userId");
      this.setState({logged: false})
      this.props.router.push({
                pathname: '/'
      });
    }

	fetchEvents(userId) {
      fetch(`http://localhost:8000/user/${userId}/events`,{
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
		this.fetchEvents(userId);
  }

  openEventInformation(selectedEvent) {
    this.props.router.push({
      pathname: '/user/event-info',
      state: { 
        eventInformation: selectedEvent
      } 
    })
    console.log(selectedEvent);
  }




   render() {
    return (
      <div className="background">
      <Navbar router={this.props.router} logOut={this.logOut.bind(this)} myaccount={true} logged={false}/>
        <div className="container">
          <h1 className="text-center">Twoje wydarzenia</h1>
            <div className="container">
              <div className="jumbotron">
              {(this.state.dataLoaded) ?
                this.state.userEvents.map((item, itemIndex) => {
                  return (
                    <div className="page-header"> 
                      <p className="event-name">Nazwa wydarzenia: {this.state.userEvents[itemIndex].event_name}</p>
                      <i className="fa fa-plus" onClick={this.openEventInformation.bind(this, item)} aria-hidden="true"></i>
                    </div>
                  );
                }) : <img src="http://rpg.drivethrustuff.com/shared_images/ajax-loader.gif"/>
              }
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserEvents;
