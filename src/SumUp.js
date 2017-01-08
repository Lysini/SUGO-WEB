import React, { Component } from 'react';
import { Link } from 'react-router';
import './SumUp.css';

class SumUp extends Component {
	constructor() {
	    super();
	    this.state = {

	    };
	}




  render() {
  	console.log(this.query.place);
    return (
      <div className="container">
      	<h1>ORGANIZER</h1>
      </div>
    );
  }
}

export default SumUp;
