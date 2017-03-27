import React, { Component } from 'react';
import { Link } from 'react-router';
import './User.css';
import Navbar from '../Home/Navbar';
import config from '../config';

class EventInfoPlace extends Component {
  constructor() {
      super();
      this.state = {
        editMode: false
      };
  }


  componentWillMount(){
      this.setState({
          placeName: this.props.place.placeName,
          placeLocation: this.props.place.placeLocation,
          placePrice: this.props.place.placePrice,
          placeMax: this.props.place.placeMax,
          placeNote: this.props.place.placeNote,
          special_info: this.props.place.special_info
      });
  }

  updateEventGeneralInfo() {
    var eventId = this.props.params.id;
      fetch(`${config.apiUrl}/event/${eventId}/update/general-info`,{
          headers: {
            'Accept': 'application/json',
             'Content-Type': 'application/json'
          },
          method: 'PUT',
          body: JSON.stringify({
            event_name: this.state.event_name,
            place:{
                placeName: this.state.placeName,
                placeLocation: this.state.placeLocation,
                placePrice: this.state.placePrice,
                placeMax: this.state.placeMax,
                placeNote: this.state.placeNote
            },
            special_info: this.state.special_info
          })
        })
        .then(
            response => {
                  const status = response.status;
                  if (status === 200) {
                    return response.json();
                  }
        })
        .then(responseData =>{
            this.setState({editMode: false});
            this.props.reFetchEvent;
        });
    }

  render(){
    return(
      <div>
        {(!this.state.editMode) ?
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
            <button className="btn" onClick={() => this.setState({editMode: true})}>Edytuj</button>
          </div>
        :
          <div>
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
            <button className="btn" onClick={this.updateEventGeneralInfo.bind(this)}>Zapisz zmiany</button>
          </div>
        }
      </div>
    );
  }
}

export default EventInfoPlace;