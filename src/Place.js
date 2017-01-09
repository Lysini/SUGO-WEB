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
			   </form>
		   </div>
			<button className="btn PlaceSave" onClick={this.saveUp.bind(this)}>Save</button>
      	</div>
      </div>
    );
  }
}

export default Place;