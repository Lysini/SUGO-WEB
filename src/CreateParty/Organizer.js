import React, { Component } from 'react';
import './CreateParty.css';

class Organizer extends Component {
	constructor() {
	    super();
	    this.state = {
	    	organizerName: '',
	    	organizerNote: '',
	    	eventName: '',
	    	logged: false,
	    };
	}

	saveUp() {
		this.props.router.push({
		  pathname: '/create',
		  state: { 
	    	organizerName: this.state.organizerName,
	    	organizerNote: this.state.organizerNote,
	    	eventName: this.state.eventName
		  } 
		})
	}

	checkLogInActive(){
	    if(!!localStorage.getItem("userId")){
	      this.setState({logged: true})
	      this.fetchUserData();
	    }
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
    	this.checkLogInActive();
  	}

	onClose() {
		this.props.router.push({
		  pathname: '/'
		})
	}

  render() {
  	console.log(this.state.organizerName);
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
					<input className="form-control PlaceText" onChange={eventName => this.setState({ eventName:eventName.target.value })} value={this.state.eventName} />
				</div>
				{ (!this.state.logged) ? 
					<div>
					    <div className="form-group">
							<label>Name:</label>
							<input className="form-control PlaceText" onChange={organizerName => this.setState({ organizerName:organizerName.target.value })} value={this.state.organizerName} />
						</div>
					    <div className="form-group">
							<label>Note:</label>
							<textarea className="form-control PlaceTextArea" onChange={organizerNote => this.setState({ organizerNote:organizerNote.target.value })} value={this.state.organizerNote} />
						</div>
					</div>
				: null }
			   </form>
		   </div>
			<button className="btn PlaceSave" onClick={this.saveUp.bind(this)}>Next</button>
      	</div>
      </div>
    );
  }
}

export default Organizer;