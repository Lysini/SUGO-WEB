import React, { Component } from 'react';
import './Event.css';
import config from '../config';

class EventInfoPlace extends Component {
  constructor() {
      super();
      this.state = {
        editMode: false
      };
      this.onClose = this.onClose.bind(this);
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
    if(this.validatePlace(this.state.eventName, this.state.placeName, this.state.placeLocation, this.state.placePrice, this.state.placeMax, this.state.placeNote)){
      var eventId = this.props.eventId;
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
            this.props.reFetchEvent();
        });
      }
    }

    onClose() {
      this.setState({editMode: false});
      this.setState({
          placeName: this.props.place.placeName,
          placeLocation: this.props.place.placeLocation,
          placePrice: this.props.place.placePrice,
          placeMax: this.props.place.placeMax,
          placeNote: this.props.place.placeNote,
          special_info: this.props.place.special_info
      });
    }

    validatePlace(event_name, placeName, placeLocation, placePrice, placeMax, placeNote) {
      var allowedNameChars = new RegExp("^([A-Za-z]{3,20})$"); 
      var allowedPriceChars = new RegExp("^([0-9]{0,4})$"); 
      var allowedMaxChars = new RegExp("^([0-9]{0,4})$"); 
      var allowedNoteChars = new RegExp("^([A-Za-z]{0,150})$"); 
      if (!allowedNameChars.test(event_name)) {
        this.setState({ validEventNameErrorText: 'Nazwa wydarzenia może zawierać od 3 do 20 liter.' });
      }
      else{
        this.setState({ validEventNameErrorText: '' });
      }
      if (!allowedNameChars.test(placeName)) {
        this.setState({ validNameErrorText: 'Nazwa lokacji może zawierać od 3 do 20 liter.' });
      }
      else{
        this.setState({ validNameErrorText: '' });
      }
      if (placeLocation.length > 40) {
        this.setState({ validLocationErrorText: 'Lokalizacja może zawierać maksymalnie 40 znaków' });
      }
      else{
        this.setState({ validLocationErrorText: '' });
      }
      if (!allowedPriceChars.test(placePrice)) {
        this.setState({ validPriceErrorText: 'Cena może zawierać maksymalnie 4 cyfry' });
      }
      else{
        this.setState({ validPriceErrorText: '' });
      }
      if (!allowedMaxChars.test(placeMax)) {
        this.setState({ validMaxErrorText: 'Ilość miejsc nie może być dłuższa niż 4 cyfry' });
      }
      else{
        this.setState({ validMaxErrorText: '' });
      }
      if (!allowedNoteChars.test(placeNote)) {
        this.setState({ validNoteErrorText: 'Notatka może zawierać nie więcej niż 150 cyfr i liter' });
      }
      else{
        this.setState({ validNoteErrorText: '' });
      }
      if(allowedNameChars.test(placeName) && allowedNameChars.test(event_name) && this.state.validLocationErrorText === '' && allowedPriceChars.test(placePrice) && allowedMaxChars.test(placeMax) && allowedNoteChars.test(placeNote)) {
        return true;
      }
      return false;
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
            <div className="close-edit" onClick={this.onClose}>
                <div className="close-left-edit"></div>
                <div className="close-right-edit"></div>
            </div> 
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
              <div className="form-group">
                <p className="error-text">{this.state.validEventNameErrorText}</p>
                <p className="error-text">{this.state.validNameErrorText}</p>
                <p className="error-text">{this.state.validLocationErrorText}</p>
                <p className="error-text">{this.state.validPriceErrorText}</p>
                <p className="error-text">{this.state.validMaxErrorText}</p>
                <p className="error-text">{this.state.validNoteErrorText}</p>
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