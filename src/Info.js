import React, { Component } from 'react';
import './Place.css';

class Info extends Component {
	constructor() {
	    super();
	    this.state = {
	    	info: ''
	    };
	}

	saveUp() {
		this.props.saveInfo(
	      this.state.info
	    );
	}

  render() {
    return (
      <div className="openedPlace">
		<button onClick={this.props.onClose}>Close</button>
		<button className="btn pull-right" onClick={this.saveUp.bind(this)}>Save</button>
      </div>
    );
  }
}

export default Info;