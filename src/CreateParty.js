import React, { Component } from 'react';
import People from './People';
import Stuff from './Stuff';
import Place from './Place';
import Info from './Info';
import SumUp from './SumUp';
import './CreateParty.css';

class CreateParty extends Component {
	constructor() {
	    super();
	    this.state = {
	    	sumUpOpened: false,
	    	peopleOpened: false,
	    	stuffOpened: false,
	    	placeOpened: false,
	    	infoOpened: false,
	    	info: '',
	    	place: { placeName: '',
	    			 placeLocation: '',
	    			 placePrice: 0,
	    			 placeMax: 0,
	    			 placeNote: '' },
	    	peopleMen: [],
	    	peopleWomen: [],
	    	numberOfUsers: 0
	    };
	}

	savePlace(placeName, placeLocation, placePrice, placeMax, placeNote) {
		this.setState({
			placeOpened: false,
	    	place: { placeName: placeName,
	    			 placeLocation: placeLocation,
	    			 placePrice: placePrice,
	    			 placeMax: placeMax,
	    			 placeNote: placeNote }
	    });
	}

	savePeople(peopleMen, peopleWomen, numberOfUsers) {
		this.setState({
			peopleOpened: false,
	    	peopleMen: peopleMen,
	    	peopleWomen: peopleWomen,
	    	numberOfUsers: numberOfUsers
	    });
	}

	saveInfo(info) {
		this.setState({
			infoOpened: false,
			info: info
		});
	}

	openPeople() {
		return (
          <People savePeople={this.savePeople.bind(this)}  onClose={()=>{this.setState({ peopleOpened: false })}} />
      	);
	}

	openStuff() {
		return (
          <Stuff onClose={()=>{this.setState({ stuffOpened: false })}} />
      	);
	}

	openPlace() {
		return (
          <Place savePlace={this.savePlace.bind(this)} onClose={()=>{this.setState({ placeOpened: false })}} />
      	);
	}

	openInfo() {
		return (
          <Info saveInfo={this.saveInfo.bind(this)} onClose={()=>{this.setState({ infoOpened: false })}} />
      	);
	}

	openSumUp() {
		return (
          <SumUp numberOfUsers={this.state.numberOfUsers} peopleWomen={this.state.peopleWomen} peopleMen={this.state.peopleMen} place={this.state.place} info={this.state.info} onClose={()=>{this.setState({ sumUpOpened: false })}} />
      	);
	}


  render() {
  	console.log(this.state);
  	if(this.state.peopleOpened) {
  		return this.openPeople();
  	}
  	else if(this.state.stuffOpened) {
  		return this.openStuff();
  	}
  	else if(this.state.placeOpened) {
  		return this.openPlace();
  	}
  	else if(this.state.infoOpened) {
  		return this.openInfo();
  	}
  	else if(this.state.sumUpOpened) {
  		return this.openSumUp();
  	}
    return (
      <div className="container center">
      	<h1>ORGANIZER</h1>
      	<div className="btn-group">
      		<button className="btn" onClick={()=> {this.setState({ peopleOpened: true });}}>PEOPLE</button>
      		<button className="btn" onClick={()=> {this.setState({ stuffOpened: true });}}>STUFF</button>
      		<button className="btn" onClick={()=> {this.setState({ placeOpened: true });}}>PLACE</button>
      		<button className="btn" onClick={()=> {this.setState({ infoOpened: true });}}>SPECIAL INFO</button>
      		<button className="btn main-slogan-btn" onClick={()=> {this.setState({ sumUpOpened: true });}}>Sum Up</button>
      	</div>
      </div>

    );
  }
}

export default CreateParty;
