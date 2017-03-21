import React, { Component } from 'react';
import './SumUp.css';
import config from '../config';

class SumUp extends Component {
	constructor() {
	    super();
	    this.state = {

	    };
	}


   addEvent() {
	var userId = localStorage.getItem("userId");
	fetch(`${config.apiUrl}/event`,{
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			event_name: this.props.location.state.eventName,
        	organizer_id: userId,
        	stuff: this.props.location.state.stuff,
        	people: this.props.location.state.people,
        	place: this.props.location.state.place,
            special_info: this.props.location.state.info
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
		  pathname: '/user/events'
		})
	})
	.catch(err => {
		console.log(err);
	})
}


    cancelAddingEvent(){
    	this.props.router.push({
		  pathname: '/',
		})
   }




  render() {
  	console.log(this);
  	console.log(this.props.location.state);
    return (
      <div className="container">
      <div className="PlaceClose" onClick={this.cancelAddingEvent.bind(this)}>
     		<div className="close-left"></div>
      		<div className="close-right"></div>
      	</div>
      	<h1 className="text-center">Podsumowanie</h1>
		<table className="table"> 
		    <caption>Miejsce wydarzenia</caption> 
		    <tbody> 
		        <tr> 
		            <th>Nazwa</th> 
		            <td>{this.props.location.state.place.placeName}</td> 
		        </tr> 
		        <tr> 
		            <th>Lokalizacja</th> 
		            <td>{this.props.location.state.place.placeLocation}</td>  
		        </tr> 
		        <tr> 
		            <th>Cena</th> 
		          	<td>{this.props.location.state.place.placePrice}</td>   
		        </tr> 
		        <tr> 
		            <th>Maksymalna liczba miejsc</th> 
		            <td>{this.props.location.state.place.placeMax}</td>  
		        </tr> 
		        <tr> 
		            <th>Informacje</th> 
		            <td>{this.props.location.state.place.placeNote}</td>  
		        </tr> 
		            <th>Dodatkowe Informacje</th> 
		            <p className="SumUpDodatkowe">{this.props.location.state.info}</p>
			</tbody>
		</table> 
		<button className="btn InfoSave" onClick={this.addEvent.bind(this)}>Next</button>
      </div>
    );
  }
}

export default SumUp;
