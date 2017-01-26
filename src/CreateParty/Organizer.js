import React, { Component } from 'react';
import './CreateParty.css';

class Organizer extends Component {
	constructor() {
	    super();
	    this.state = {
	    	organizerName: '',
	    	organizerNote: ''
	    };
	}

	saveUp() {
		this.props.router.push({
		  pathname: '/create',
		  state: { 
	    	organizerName: this.state.organizerName,
	    	organizerNote: this.state.organizerNote
		  } 
		})

	}

	onClose() {
		this.props.router.push({
		  pathname: '/'
		})
	}

  render() {
    return (
      <div className="openedPlace">
      <h1 className="title">Organizator</h1>
      	<div className="PlaceClose" onClick={this.onClose.bind(this)}>
     		<div className="close-left"></div>
      		<div className="close-right"></div>
      	</div>
      	<div className="container">
      		<div className="form-container">
		      <form>
			    <div className="form-group">
					<label>Name:</label>
					<input className="form-control PlaceText" onChange={organizerName => this.setState({ organizerName:organizerName.target.value })} value={this.state.organizerName} />
				</div>
			    <div className="form-group">
					<label>Note:</label>
					<textarea className="form-control PlaceTextArea" onChange={organizerNote => this.setState({ organizerNote:organizerNote.target.value })} value={this.state.organizerNote} />
				</div>
			   </form>
		   </div>
			<button className="btn PlaceSave" onClick={this.saveUp.bind(this)}>Next</button>
      	</div>
      </div>
    );
  }
}

export default Organizer;