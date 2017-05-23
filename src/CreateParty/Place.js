import React, { Component } from 'react';
import './style.css';

class Place extends Component {
	constructor() {
	    super();
	    this.state = {
	    	placeName: '',
	    	placeLocation: '',
	    	placePrice: 0,
	    	placeMax: 0,
	    	placeNote: ''
	    };
	}

	saveUp() {
		if(this.validatePlace(this.state.placeName, this.state.placeLocation, this.state.placePrice, this.state.placeMax, this.state.placeNote)){
			this.props.savePlace(
		      this.state.placeName,
		      this.state.placeLocation,
		      this.state.placePrice,
		      this.state.placeMax,
		      this.state.placeNote
		    );
		}
	}

	validatePlace(placeName, placeLocation, placePrice, placeMax, placeNote) {
	    var allowedNameChars = new RegExp("^([A-Za-z]{3,20})$"); 
	    var allowedPriceChars = new RegExp("^([0-9]{0,4})$"); 
	    var allowedMaxChars = new RegExp("^([0-9]{0,4})$"); 
	    var allowedNoteChars = new RegExp("^([A-Za-z]{0,150})$"); 
	    if (!allowedNameChars.test(placeName)) {
	      this.setState({ validNameErrorText: 'Nazwa może zawierać od 3 do 20 liter.' });
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
	    if(allowedNameChars.test(placeName) && this.state.validLocationErrorText === '' && allowedPriceChars.test(placePrice) && allowedMaxChars.test(placeMax) && allowedNoteChars.test(placeNote)) {
	      return true;
	    }
	    return false;
	}

  render() {
  	console.log(this.state.validNameErrorText);
    return (
      <div className="openedPlace">
      	<div className="PlaceClose" onClick={this.props.onClose}>
     		<div className="close-left"></div>
      		<div className="close-right"></div>
      	</div>
      	<div className="container pull-left">
      		<div className="form-container">
		      <form>
			    <div className="form-group">
					<label>Name:</label>
					<input className="form-control PlaceText" onChange={placeName => this.setState({ placeName:placeName.target.value })} value={this.state.placeName} />
				</div>
				<div className="form-group">
					<label>Location:</label>
					<input className="form-control PlaceText" onChange={placeLocation => this.setState({ placeLocation:placeLocation.target.value })} value={this.state.placeLocation} />
				</div>
			    <div className="form-group">
					<label>Price:</label>
					<input className="form-control PlaceText" onChange={placePrice => this.setState({ placePrice:placePrice.target.value })} value={this.state.placePrice} />
				</div>
			    <div className="form-group">
					<label>Maximum places:</label>
					<input className="form-control PlaceText" onChange={placeMax => this.setState({ placeMax:placeMax.target.value })} value={this.state.placeMax} />
				</div>
			    <div className="form-group">
					<label>Note:</label>
					<textarea className="form-control PlaceTextArea" onChange={placeNote => this.setState({ placeNote:placeNote.target.value })} value={this.state.placeNote} />
				</div>
				<div className="form-group">
					<p className="error-text">{this.state.validNameErrorText}</p>
					<p className="error-text">{this.state.validLocationErrorText}</p>
					<p className="error-text">{this.state.validPriceErrorText}</p>
					<p className="error-text">{this.state.validMaxErrorText}</p>
					<p className="error-text">{this.state.validNoteErrorText}</p>
				</div>
			   </form>
		   </div>
			<button className="btn PlaceSave" onClick={this.saveUp.bind(this)}>Next</button>
      	</div>
      </div>
    );
  }
}

export default Place;