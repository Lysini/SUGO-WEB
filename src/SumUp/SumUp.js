import React, { Component } from 'react';
//import { Link } from 'react-router';
import './SumUp.css';

class SumUp extends Component {
	constructor() {
	    super();
	    this.state = {

	    };
	}


	addEvent() {
	var userId = localStorage.getItem("userId");
    fetch('http://localhost:8000/event',{
        headers: {
          'Accept': 'application/json',
           'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
        	organizer_id: userId,
        	event_name: 'xD',
        	stuff: this.props.location.state.stuff,
        	/*stuff_label: this.props.stuff.labelName
        	stuff_array: this.props.stuff.labelName.stuffArray ,
            stuff_name: this.props.stuff.stuffItem.stuffName,
			stuff_price: this.props.stuff.stuffItem.stuffPrice,
			stuff_amount: this.props.stuff.stuffItem.stuffAmount,*/
            special_info: this.props.location.state.info
        })
      })
      .then(
          response => {
                const status = response.status;
                if (status === 201) {
                  return response.json();
                }
      })
      .then(responseData =>{
        console.log(responseData)
      });
  
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



		/*	people: this.props.people,
			people_men: this.props.people.peopleMen,
			people_women: this.props.people.peopleWomen,
			men_name: this.props.people.peopleMen.peopleName,
			men_note: this.props.people.peopleMen.peopleNote,
			women_name: this.props.people.peopleWomen.peopleName,
			women_note: this.props.people.peopleWomen.peopleNote,
			*/
