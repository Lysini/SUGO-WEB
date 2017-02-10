import React, { Component } from 'react';
import { Link } from 'react-router';
import './User.css';

class UserEventInfo extends Component {
	constructor() {
	    super();
	    this.state = {
        	dataLoaded: false
	    };
	}

render() {
    const { eventInformation } = this.props.location.state;
    return (
      <div className="background">
        <div className="container">
          <li><a href="#"><Link to={`/user/events`}>User</Link></a></li>
          <h1 className="text-center">{eventInformation.event_name}</h1>
            <div className="container">
              <div className="jumbotron">
                    {eventInformation.stuff.map((stuffItem, stuffIndex) => {
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
                        {eventInformation.people.peopleMen.map((peopleItem, peopleIndex) => {
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
                        {eventInformation.people.peopleWomen.map((peopleItem, peopleIndex) => {
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
                          <p className="event-name">Nazwa: {eventInformation.place.placeName}</p>
                          <p className="event-name">{eventInformation.place.placeLocation}</p>
                          <p className="event-name">{eventInformation.place.placePrice}</p>
                          <p className="event-name">{eventInformation.place.placeMax}</p>
                          <p className="event-name">{eventInformation.place.placeNote}</p>
                        </div> 
                        <div className="event-box">
                          <p className="event-name">Dodatkowe informacje: {eventInformation.special_info}</p>
                        </div>
                      </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserEventInfo;
