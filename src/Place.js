import React, { Component } from 'react';
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
	      	<p>Name:<input type="text" onChange={placeName => this.setState({ placeName:placeName.target.value })} value={this.state.placeName} /></p>
	      	<p>Location:<input type="text" onChange={placeLocation => this.setState({ placeLocation:placeLocation.target.value })} value={this.state.placeLocation} /></p>
	      	<p>Price:<input type="text" onChange={placePrice => this.setState({ placePrice:placePrice.target.value })} value={this.state.placePrice} /> zł</p>
	      	<p>Maximum places:<input type="text" onChange={placeMax => this.setState({ placeMax:placeMax.target.value })} value={this.state.placeMax} /></p>
	      	<p>Note:<textarea type="text" onChange={placeNote => this.setState({ placeNote:placeNote.target.value })} value={this.state.placeNote} /></p>
	      </form>
	      <h1>{this.state.placeName}</h1>
	      <h1>{this.state.placeLocation}</h1>
	      <h1>{this.state.placeNote}</h1>
		<button onClick={this.saveUp.bind(this)}>Save</button>
		<button onClick={this.props.onClose}>Close</button>
      </div>
    );
  }
}

export default Place;