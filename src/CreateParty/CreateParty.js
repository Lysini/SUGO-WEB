import React, { Component } from 'react';
import People from './People';
import Stuff from './Stuff';
import Place from './Place';
import Info from './Info';
import './style.css';

class CreateParty extends Component {
	constructor() {
	    super();
	    this.state = {
	    	sumUpOpened: false,
	    	peopleOpened: true,
	    	stuffOpened: false,
	    	placeOpened: false,
	    	infoOpened: false,
	    	info: '',
	    	stuff: [],
	    	place: { placeName: '',
	    			 placeLocation: '',
	    			 placePrice: 0,
	    			 placeMax: 0,
	    			 placeNote: '' },
	    	people: {},
	    	numberOfUsers: 0
	    };
	}

	savePlace(placeName, placeLocation, placePrice, placeMax, placeNote) {
		this.setState({
			placeOpened: false,
			infoOpened: true,
	    	place: { placeName: placeName,
	    			 placeLocation: placeLocation,
	    			 placePrice: placePrice,
	    			 placeMax: placeMax,
	    			 placeNote: placeNote }
	    });
	}

	savePeople(people) {
		this.setState({
			peopleOpened: false,
			stuffOpened: true,
	    	people: people
	    });
	}

	saveStuff(stuff) {
		this.setState({
			stuffOpened: false,
			placeOpened: true,
			stuff: stuff
	    });
	}

	saveInfo(info) {
		this.setState({
			infoOpened: false,
			sumUpOpened: true,
			info: info
		});
		this.openSumUp.bind(this);
	}

	openPeople() {
		return (
          <People organizerName={this.props.location.state.organizerName}
		          organizerNote={this.props.location.state.organizerNote} 
		          savePeople={this.savePeople.bind(this)}  
		          onClose={()=>{this.setState({ peopleOpened: false })}} />
      	);
	}

	openStuff() {
		return (
          <Stuff saveStuff={this.saveStuff.bind(this)} onClose={()=>{this.setState({ stuffOpened: false })}} />
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
		this.props.router.push({
		  pathname: '/sum-up',
		  state: { 
		  	organizerName: this.props.location.state.organizerName,
		  	organizerNote: this.props.location.state.organizerNote,
		  	place: this.state.place,
		  	stuff: this.state.stuff,
		  	info: this.state.info,
		  	people: this.state.people,
		  	numberOfUsers: this.state.numberOfUsers,
		  } 
		})
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
    	
  }
}

export default CreateParty;
