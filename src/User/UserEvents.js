import React, { Component } from 'react';
import { Link } from 'react-router';
import './User.css';

class UserEvents extends Component {
	constructor() {
	    super();
	    this.state = {
        dataLoaded: false
	    };

	    this.fetchEvents = this.fetchEvents.bind(this);
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
        <div className="container">
          <li><a href="#"><Link to={`/user`}>User</Link></a></li>
          <h1 className="text-center">Twoje wydarzenia</h1>
            <div className="container">
              <div className="jumbotron">
              {(this.state.dataLoaded) ?
                this.state.userEvents.map((item, itemIndex) => {
                  return (
                    <div>
                    <p className="event-name">Nazwa wydarzenia: {this.state.userEvents[itemIndex].event_name}</p>
                    <i className="fa fa-plus" onClick={this.openEventInformation.bind(this, item)} aria-hidden="true"></i>
                    {this.state.userEvents[itemIndex].stuff.map((stuffItem, stuffIndex) => {
                          return (
                              <div className="event-box">
                                <p className="event-name">Nazwa stuffu: {stuffItem.labelName}</p>
                                  {stuffItem.stuffArray.map((stuffArrayItem, stuffArrayIndex) => {
                                        return (
                                            <div className="event-box">
                                              <p className="event-name">Nazwa przedmiotu: {stuffArrayItem.stuffName}</p>
                                              <p className="event-name">Nazwa cena: {stuffArrayItem.stuffPrice}</p>
                                              <p className="event-name">Nazwa ilość: {stuffArrayItem.stuffAmount}</p>
                                            </div>  
                                        );
                                    })
                                  }
                              </div>  
                          );
                      })
                    }
                    <div className="event-box">
                      <p className="event-name">Mężczyźni:</p>
                      <div className="event-box">
                        {this.state.userEvents[itemIndex].people.peopleMen.map((peopleItem, peopleIndex) => {
                            return (
                              <div className="event-box">
                                  <p className="event-name">Imie: {peopleItem.peopleName}</p>
                                  <p className="event-name">Notka: {peopleItem.peopleNote}</p>
                              </div> 
                            );
                          })
                        }
                      </div>  
                      <p className="event-name">Kobiety:</p>
                      <div className="event-box">
                        {this.state.userEvents[itemIndex].people.peopleWomen.map((peopleItem, peopleIndex) => {
                            return (
                              <div className="event-box">
                                  <p className="event-name">Imie: {peopleItem.peopleName}</p>
                                  <p className="event-name">notka: {peopleItem.peopleNote}</p>
                              </div> 
                            );
                          })
                        }
                      </div>  
                    </div>  
                       <div className="event-box-2">
                        <div className="event-box">
                          <p className="event-name">Miejsce</p>
                          <p className="event-name">Nazwa: {this.state.userEvents[itemIndex].place.placeName}</p>
                          <p className="event-name">{this.state.userEvents[itemIndex].place.placeLocation}</p>
                          <p className="event-name">{this.state.userEvents[itemIndex].place.placePrice}</p>
                          <p className="event-name">{this.state.userEvents[itemIndex].place.placeMax}</p>
                          <p className="event-name">{this.state.userEvents[itemIndex].place.placeNote}</p>
                        </div> 
                        <div className="event-box">
                          <p className="event-name">Dodatkowe informacje: {this.state.userEvents[itemIndex].special_info}</p>
                        </div>
                      </div>
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
