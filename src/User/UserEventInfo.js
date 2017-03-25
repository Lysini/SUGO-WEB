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
          editMode: false,
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
        this.setState({
                        eventId: responseData.data._id,
                        eventName: responseData.data.event_name,
                        organizerId: responseData.data.organizer_id,
                        peopleWomen: responseData.data.people.peopleWomen,
                        peopleMen: responseData.data.people.peopleMen,
                        placeLocation: responseData.data.place.placeLocation,
                        placeName: responseData.data.place.placeName,
                        placePrice: responseData.data.place.placePrice,
                        placeMax: responseData.data.place.placeMax,
                        placeNote: responseData.data.place.placeNote,
                        special_info: responseData.data.special_info,
                        stuff: responseData.data.stuff,
                        dataLoaded: true });
      });
  }

  componentWillMount() {
    this.fetchEvent(this.props.params.id);
  }

  updateUser(){
    let person = {
      peopleName: this.state.inputName,
      peopleNote: this.state.inputNote,
    };
    if(this.state.peopleSex === "men") {
      this.state.people.peopleMen[this.state.assistantNumber]=person;
    }
    else {
      this.state.people.peopleWomen[this.state.assistantNumber]=person;
    }
    this.setState({ 
      showModal: false,
      inputName: '',
      inputNote: '' 
    });
  }

render() {
  console.log(this.state.viewerIsOrganizer)
    return (
      <div className="main-bg">
      <Navbar myaccount={true} router={this.props.router}/>
        {
        (this.state.dataLoaded) ?
        <div className="user-event-info">
           <h1 className="text-center">{this.state.eventName}</h1>
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
                          <form>
                            <h2 className="text-center">Miejsce</h2>
                            <div className="form-group">
                              <label>Nazwa: {this.state.placeName}</label>
                            </div>
                            <div className="form-group">
                              <label>Miejsce: {this.state.placeLocation}</label>
                            </div>
                            <div className="form-group">
                              <label>Cena: {this.state.placePrice}</label>
                            </div>
                            <div className="form-group">
                             <label>Max Osob: {this.state.placeMax}</label>
                            </div>
                            <div className="form-group">
                              <label>Notka: {this.state.placeNote}</label>
                            </div>
                            <div className="form-group">
                              <label>Dodatkowe informacje: {this.state.special_info}</label>
                            </div>
                          </form>
                        </div>
                        :
                        <div>
                          <h2 className="text-center">Miejsce</h2>
                          <form>
                            <div className="form-group">
                              <label>Nazwa Wydarzenia: <input className="form-control" onChange={eventName => this.setState({ eventName: eventName.target.value })} value={this.state.eventName} /></label>
                            </div>
                            <div className="form-group">
                              <label>Nazwa: <input className="form-control" onChange={placeName => this.setState({ placeName: placeName.target.value })} value={this.state.placeName} /></label>
                            </div>
                            <div className="form-group">
                              <label>Miejsce: <input className="form-control" onChange={placeLocation => this.setState({ placeLocation: placeLocation.target.value })} value={this.state.placeLocation} /></label>
                            </div>
                            <div className="form-group">
                              <label>Cena: <input className="form-control" onChange={placePrice => this.setState({ placePrice: placePrice.target.value })} value={this.state.placePrice} /></label>
                            </div>
                            <div className="form-group">
                              <label>Max Osob: <input className="form-control" onChange={placeMax => this.setState({ placeMax: placeMax.target.value })} value={this.state.placeMax} /></label>
                            </div>
                            <div className="form-group">
                              <label>Notka: <input className="form-control" onChange={placeNote => this.setState({ placeNote: placeNote.target.value })} value={this.state.placeNote} /></label>
                            </div>
                            <div className="form-group">
                              <label>Dodatkowe informacje: <textArea className="form-control" onChange={special_info => this.setState({ special_info: special_info.target.value })} value={this.state.special_info} /></label>
                            </div>
                          </form>
                        </div>
                      }
                     <button className="btn pull-right" onClick={() => this.setState({editMode: true})}>Edit</button>
                     </div>
                      : null
                    }
                    {(this.state.showPageNumber === 1) ?
                    <div>
                      <div className="col-sm-4 text-center">
                        <p className="people-men">Mężczyźni:</p>
                        <div className="people-men-1">
                          {this.state.peopleMen.map((peopleItem, peopleIndex) => {
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
                          {this.state.peopleWomen.map((peopleItem, peopleIndex) => {
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
                    {(this.state.showPageNumber === 2) ?
                      <div className="row">
                         {this.state.stuff.map((stuffItem, stuffIndex) => {
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
