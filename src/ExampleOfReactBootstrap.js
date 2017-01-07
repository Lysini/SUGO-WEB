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