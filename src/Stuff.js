import React, { Component } from 'react';
import './Place.css';

class Place extends Component {
	constructor() {
	    super();
	    this.state = {

	    };
	}

  render() {
    return (
      <div className="openedPlace">
		<button onClick={this.props.onClose}>Save</button>
      </div>
    );
  }
}

export default Place;