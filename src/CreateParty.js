import React, { Component } from 'react';
import logo from './logo.svg';
import People from './People';
import Stuff from './Stuff';
import Place from './Place';
import Info from './Info';
import './App.css';

class CreateParty extends Component {
	constructor() {
	    super();
	    this.state = {
	    	peopleOpened: false,
	    	stuffOpened: false,
	    	placeOpened: false,
	    	infoOpened: false
	    };
	}

	openPeople() {
		return (
          <People onClose={()=>{this.setState({ peopleOpened: false })}} />
      	);
	}

	openStuff() {
		return (
          <Stuff onClose={()=>{this.setState({ stuffOpened: false })}} />
      	);
	}

	openPlace() {
		return (
          <Place onClose={()=>{this.setState({ placeOpened: false })}} />
      	);
	}

	openInfo() {
		return (
          <Info onClose={()=>{this.setState({ infoOpened: false })}} />
      	);
	}


  render() {
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
    return (
      <div className="App">
      	<h1>ORGANIZER</h1>
      	<div className="btn-group">
      		<button className="" onClick={()=> {this.setState({ peopleOpened: true });}} >PEOPLE</button>
      		<button className="" onClick={()=> {this.setState({ stuffOpened: true });}} >STUFF</button>
      		<button className="" onClick={()=> {this.setState({ placeOpened: true });}}>PLACE</button>
      		<button className="" onClick={()=> {this.setState({ infoOpened: true });}}>SPECIAL INFO</button>
      	</div>
      </div>
    );
  }
}

export default CreateParty;
