import React, { Component } from 'react';
import './CreateParty.css';

class Organizer extends Component {
	constructor() {
	    super();
	    this.state = {
	    	organizerName: '',
	    	organizerNote: '',
	    	event_name: '',
	    };
	}

	saveUp() {
		this.props.saveOrganizer(
	    	this.state.organizerName,
	    	this.state.organizerNote,
	    	this.state.event_name
		)
	}

	fetchUserData(){
		var userId= localStorage.getItem("userId");
		fetch(`http://localhost:8000/user/${userId}`,{
			method: 'GET'
		})
		.then(
			response => {
				const status = response.status;
				if(status===200){
					return response.json();
				}
			})
		.then(responseData =>{
			console.log(responseData);
			this.setState({ organizerName: responseData.data.name, organizerNote: responseData.data.note
				 });
		});
	}

	componentWillMount(){
    	this.fetchUserData();
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
							<label>Event Name:</label>
							<input className="form-control PlaceText" onChange={event_name => this.setState({ event_name:event_name.target.value })} value={this.state.event_name} />
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