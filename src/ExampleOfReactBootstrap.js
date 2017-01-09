import React, { Component } from 'react';
import { ControlLabel, FormGroup, FormControl, Button } from 'react-bootstrap';
import './Place.css';

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

	// First we detect the click event
document.querySelector('.box').addEventListener('click', function () {
  // Using an if statement to check the class
  if (this.classList.contains('bad')) {
    // The box that we clicked has a class of bad so let's remove it and add the good class
   this.classList.remove('bad');
   this.classList.add('good');
  } else {
    // The user obviously can't follow instructions so let's alert them of what is supposed to happen next
    alert("You can proceed!");
  }
});

	saveUp() {
		this.props.savePlace(
	      this.state.placeName,
	      this.state.placeLocation,
	      this.state.placePrice,
	      this.state.placeMax,
	      this.state.placeNote
	    );
	}

  render() {
    return (
      <div className="openedPlace">
	      <form>
	        <FormGroup controlId="formBasicText" >
	      	<ControlLabel>Name:</ControlLabel>
	      	<FormControl type="text" onChange={placeName => this.setState({ placeName:placeName.target.value })} value={this.state.placeName} />
	      	<ControlLabel>Location:</ControlLabel>
	      	<FormControl type="text" onChange={placeLocation => this.setState({ placeLocation:placeLocation.target.value })} value={this.state.placeLocation} />
	      	<ControlLabel>Price:</ControlLabel>
	      	<FormControl type="text" onChange={placePrice => this.setState({ placePrice:placePrice.target.value })} value={this.state.placePrice} /> zł
	      	<ControlLabel>Maximum places:</ControlLabel>
	      	<FormControl type="text" onChange={placeMax => this.setState({ placeMax:placeMax.target.value })} value={this.state.placeMax} />
	      	<ControlLabel>Note:</ControlLabel>
	      	<FormControl componentClass='text-area' type="text" onChange={placeNote => this.setState({ placeNote:placeNote.target.value })} value={this.state.placeNote} />
	      	</FormGroup>
	      </form>
	      <h1>{this.state.placeName}</h1>
	      <h1>{this.state.placeLocation}</h1>
	      <h1>{this.state.placeNote}</h1>
		<Button onClick={this.saveUp.bind(this)}>Save</Button>
		<Button onClick={this.props.onClose}>Close</Button>
      </div>
    );
  }
}

export default Place;


