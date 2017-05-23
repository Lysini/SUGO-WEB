import React, { Component } from 'react';
import './style.css';
import config from '../config';

class Info extends Component {
	constructor() {
	    super();
	    this.state = {
	    	info: ''
	    };
	}

	saveUp() {
		if(this.validateSpecialInfo(this.state.info)){
			var userId = localStorage.getItem("userId");
			console.log(userId);
			fetch(`${config.apiUrl}/event`,{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					event_name: this.props.event_name,
		        	organizer_id: userId,
		        	stuff: this.props.stuff,
		        	people: this.props.people,
		        	place: this.props.place,
		            special_info: this.state.info,
		            start_date: this.props.start_date,
		            end_date: this.props.end_date
				})
			})
			.then(
				response => {
					const status = response.status;
					if (status === 200) {
						return response.json();
					}
				})
			.then(responseData => {
				console.log(responseData);
				this.props.router.push({
				  pathname: `/user/event-info/${responseData.eventId}`
				})
			})
			.catch(err => {
				console.log(err);
			})
		}
	}

	validateSpecialInfo(special_info) {
	    var allowedChars = new RegExp("^([A-Za-z]{0,500})$"); 
	    if (!allowedChars.test(special_info)) {
	      this.setState({ validInfoErrorText: 'Możesz napisać maksymalnie 500 liter i cyfr.' });
	    }
	    else{
	    	this.setState({ validInfoErrorText: '' });
	    }
	    if(allowedChars.test(special_info)) {
	    	return true;
	    }
	    return false;
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
						<label>Special Info:</label>
						<textarea className="form-control InfoTextArea" onChange={info => this.setState({ info:info.target.value })} value={this.state.info} />
					</div>
					<div className="form-group">
						<p className="error-text">{this.state.validInfoErrorText}</p>
					</div>
					</form>
				</div>	
			<button className="btn InfoSave" onClick={this.saveUp.bind(this)}>Zapisz</button>
     	</div>
     </div>
    );
  }
}

export default Info;