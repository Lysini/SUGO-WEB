import React, { Component } from 'react';
import { Link } from 'react-router';
import './User.css';
import Navbar from '../Home/Navbar';
import config from '../config';

class UserEventInfo extends Component {
	constructor() {
	    super();
	    this.state = {
        	dataLoaded: false,
          showPageNumber: 0,
          placeLocation: '',
          editPlaceInfo: false
	    };
	}

  fetchEvent(eventId) {
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
        this.setState({ eventInformation: responseData.data,
                        dataLoaded: true });
      });
  }

  componentWillMount() {
    this.fetchEvent(this.props.params.id);
  }

render() {
    return (
      <div className="main-bg">
      <Navbar myaccount={true} router={this.props.router}/>
        {
        (this.state.dataLoaded) ?
        <div className="user-event-info">
           <h1 className="text-center">{this.state.eventInformation.event_name}</h1>
           <nav className="navbar navbar-default">
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
                    <div>
                      {(!this.state.editPlaceInfo) ?
                        <div>
                          <p>Miejsce</p>
                          <p>Nazwa: {this.state.eventInformation.place.placeName}</p>
                          <p>Miejsce: {this.state.eventInformation.place.placeLocation}</p>
                          <p>Cena: {this.state.eventInformation.place.placePrice}</p>
                          <p>Max Osob: {this.state.eventInformation.place.placeMax}</p>
                          <p>Notka: {this.state.eventInformation.place.placeNote}</p>
                          <p>Dodatkowe informacje: {this.state.eventInformation.special_info}</p>
                        </div>
                        :
                        <div>
                          <p>Miejsce</p>
                          <p>Nazwa: <input className="form-control" onChange={() => this.setState({ placeLocation: '' })} value={this.state.eventInformation.place.placeName} /></p>
                          <p>Miejsce: <input className="form-control" onChange={() => this.setState({ placeLocation: '' })} value={this.state.eventInformation.place.placeLocation} /></p>
                          <p>Cena: <input className="form-control" onChange={() => this.setState({ placeLocation: '' })} value={this.state.eventInformation.place.placePrice} /></p>
                          <p>Max Osob: <input className="form-control" onChange={() => this.setState({ placeLocation: '' })} value={this.state.eventInformation.place.placeMax} /></p>
                          <p>Notka: <input className="form-control" onChange={() => this.setState({ placeLocation: '' })} value={this.state.eventInformation.place.placeNote} /></p>
                          <p>Dodatkowe informacje: <input className="form-control" onChange={() => this.setState({ placeLocation: '' })} value={this.state.eventInformation.special_info} /></p>
                        </div>
                      }
                     <button className="btn pull-right" onClick={() => this.setState({editPlaceInfo: true})}>Edit</button>
                     </div>
                      : null
                    }
                    {(this.state.showPageNumber == 1) ?
                    <div>
                      <div className="col-sm-4 text-center">
                        <p className="people-men">Mężczyźni:</p>
                        <div className="people-men-1">
                          {this.state.eventInformation.people.peopleMen.map((peopleItem, peopleIndex) => {
                              return (
                                <div>
                                    <p>Imie: {peopleItem.peopleName}</p>
                                    <p>Notka: {peopleItem.peopleNote}</p>
                                </div> 
                              );
                            })
                          }
                        </div>  
                      </div> 
                      <div className="col-sm-4 text-center">
                        <p className="people-women">Kobiety:</p>
                        <div className="people-women-1">
                          {this.state.eventInformation.people.peopleWomen.map((peopleItem, peopleIndex) => {
                              return (
                                <div>
                                    <p>Imie: {peopleItem.peopleName}</p>
                                    <p>notka: {peopleItem.peopleNote}</p>
                                </div> 
                              );
                            })
                          }
                        </div>
                      </div>  
                    </div>
                    : null }
                    {(this.state.showPageNumber == 2) ?
                      <div className="row">
                         {this.state.eventInformation.stuff.map((stuffItem, stuffIndex) => {
                            return (
                              <div className="col-sm-4 pull-left text-center">
                                <p className="stuff-label">Nazwa stuffu: {stuffItem.labelName}</p>
                                <div className="stuff-label-content">
                                    {stuffItem.stuffArray.map((stuffArrayItem, stuffArrayIndex) => {
                                          return (
                                              <div>
                                                <p>Nazwa przedmiotu: {stuffArrayItem.stuffName}</p>
                                                <p>Nazwa cena: {stuffArrayItem.stuffPrice}</p>
                                                <p>Nazwa ilość: {stuffArrayItem.stuffAmount}</p>
                                              </div>  
                                          );
                                      })
                                    }
                                </div>
                              </div>  
                            );
                        })
                      }
                      </div>
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
