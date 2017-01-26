import React, { Component } from 'react';
import People from './People';
import Stuff from './Stuff';
import Place from './Place';
import Info from './Info';
import './CreateParty.css';

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
	    	peopleMen: [],
	    	peopleWomen: [],
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

	savePeople(peopleMen, peopleWomen, numberOfUsers) {
		this.setState({
			peopleOpened: false,
			stuffOpened: true,
	    	peopleMen: peopleMen,
	    	peopleWomen: peopleWomen,
	    	numberOfUsers: numberOfUsers
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
		  	info: this.state.info,
		  	peopleWomen: this.state.peopleWomen,
		  	peopleMen: this.state.peopleMen,
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
