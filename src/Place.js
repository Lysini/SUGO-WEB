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
      	<button className="btn pull-right" onClick={this.props.onClose}>Close</button>
      	<div className="container">
      		<div className="form-container">
		      <form>
			    <div className="form-group">
					<label>Name:</label>
					<input className="form-control" onChange={placeName => this.setState({ placeName:placeName.target.value })} value={this.state.placeName} />
				</div>
				<div className="form-group">
					<label>Location:</label>
					<input className="form-control" onChange={placeLocation => this.setState({ placeLocation:placeLocation.target.value })} value={this.state.placeLocation} />
				</div>
			    <div className="form-group">
					<label>Price:</label>
					<input className="form-control" onChange={placePrice => this.setState({ placePrice:placePrice.target.value })} value={this.state.placePrice} />
				</div>
			    <div className="form-group">
					<label>Maximum places:</label>
					<input className="form-control" onChange={placeMax => this.setState({ placeMax:placeMax.target.value })} value={this.state.placeMax} />
				</div>
			    <div className="form-group">
					<label>Note:</label>
					<textarea className="form-control" onChange={placeNote => this.setState({ placeNote:placeNote.target.value })} value={this.state.placeNote} />
				</div>
			   </form>
		   </div>
			<button className="btn pull-right" onClick={this.saveUp.bind(this)}>Save</button>
      	</div>
      </div>
    );
  }
}

export default Place;