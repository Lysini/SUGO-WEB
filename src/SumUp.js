import React, { Component } from 'react';
//import { Link } from 'react-router';
import './SumUp.css';

class SumUp extends Component {
	constructor() {
	    super();
	    this.state = {

	    };
	}




  render() {
  	console.log(this.props);
    return (
      <div className="container">
      	<h1 className="text-center">Podsumowanie</h1>
		<table className="table"> 
		    <caption>Miejsce wydarzenia</caption> 
		    <tbody> 
		        <tr> 
		            <th>Nazwa</th> 
		            <td>{this.props.place.placeName}</td> 
		        </tr> 
		        <tr> 
		            <th>Lokalizacja</th> 
		            <td>{this.props.place.placeLocation}</td>  
		        </tr> 
		        <tr> 
		            <th>Cena</th> 
		          	<td>{this.props.place.placePrice}</td>   
		        </tr> 
		        <tr> 
		            <th>Maksymalna liczba miejsc</th> 
		            <td>{this.props.place.placeMax}</td>  
		        </tr> 
		        <tr> 
		            <th>Informacje</th> 
		            <td>{this.props.place.placeNote}</td>  
		        </tr> 
		            <th>Dodatkowe Informacje</th> 
		            <p className="SumUpDodatkowe">{this.props.info}</p>
		    </tbody> 
		</table> 
      </div>
    );
  }
}

export default SumUp;
