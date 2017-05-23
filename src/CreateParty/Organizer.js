import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import config from '../config';

class Organizer extends Component {

	constructor() {
	    super();
	    this.state = {
	    	organizerName: '',
	    	organizerNote: '',
	    	event_name: '',
			startDate: moment(),
			endDate: moment()
    	};
    	this.handleChangeStart = this.handleChangeStart.bind(this);
    	this.handleChangeEnd = this.handleChangeEnd.bind(this);
	}

	handleChangeStart(date) {
	    this.setState({
	      startDate: date
	    });
	}

	handleChangeEnd(date) {
	    this.setState({
	      endDate: date
	    });
	}

	saveUp() {
  		var startDate = this.state.startDate._d.toISOString();
  		var start_date = startDate.substring(0, 10);
  		var endDate = this.state.startDate._d.toISOString();
  		var end_date = startDate.substring(0, 10);
		this.props.saveOrganizer(
	    	this.state.organizerName,
	    	this.state.organizerNote,
	    	this.state.event_name,
	    	start_date,
	    	end_date
		)
	}

	fetchUserData(){
		var userId= localStorage.getItem("userId");
		fetch(`${config.apiUrl}/user/${userId}`,{
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
			this.setState({ organizerName: responseData.data.name, organizerNote: responseData.data.note });
		});
	}

	componentWillMount(){
    	this.fetchUserData();
  	}

  render() {
    return (
		<div className="openedPlace">
			<h1 className="title">Organizator</h1>
			<div className="PlaceClose" onClick={this.props.onClose}>
     			<div className="close-left"></div>
      			<div className="close-right"></div>
      		</div>
      		<div className="container">
      			<div className="form-container">
		      		<form>
		      			<div className="form-group">
							<label>Nazwa Wydarzenia:</label>
							<input className="form-control PlaceText" onChange={event_name => this.setState({ event_name:event_name.target.value })} value={this.state.event_name} />
						</div>
						<div className="form-group">
							<label>Data rozpoczęcia wydarzenia:</label>
							<DatePicker
								dateFormat='YYYY/MM/DD'
								dateFormatCalendar='YYYY/MM/DD'
						        selected={this.state.startDate}
						        onChange={this.handleChangeStart}
						    />
						</div>
						<div className="form-group">
							<label>Data zakończenia wydarzenia:</label>
							<DatePicker
								dateFormat='YYYY/MM/DD'
								dateFormatCalendar='YYYY/MM/DD'
						        selected={this.state.endDate}
						        onChange={this.handleChangeEnd}
						    />
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