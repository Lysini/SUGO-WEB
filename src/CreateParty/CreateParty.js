import React, { Component } from 'react';
import { Link } from 'react-router';
import Organizer from './Organizer';
import SaveEvent from './SaveEvent';
import People from './People';
import Stuff from './Stuff';
import Place from './Place';
import Info from './Info';
import './style.css';


class CreateParty extends Component {
	constructor() {
	    super();
	    this.state = {
	    	organizerOpened: true,
	    	peopleOpened: false,
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
	    	event_name: '',
	    	organizerNote: ''
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

	saveOrganizer(organizerName, organizerNote, event_name){
		this.setState({
			organizerOpened: false,
			peopleOpened: true,
			organizerName: organizerName,
			organizerNote: organizerNote,
			event_name: event_name
		})
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
			info: info
		});
	}

	openOrganizer() {
		return (
		    <Organizer saveOrganizer={this.saveOrganizer.bind(this)}  
			onClose={this.cancelAdding.bind(this)}/>
		);
	}

	openPeople() {
		return (
		    <People organizerName={this.state.organizerName}
			organizerNote={this.state.organizerNote} 
			savePeople={this.savePeople.bind(this)}  
			onClose={this.cancelAdding.bind(this)}/>
		);
	}

	openStuff() {
		return (
          <Stuff saveStuff={this.saveStuff.bind(this)} onClose={this.cancelAdding.bind(this)} />
      	);
	}

	openPlace() {
		return (
          <Place savePlace={this.savePlace.bind(this)} onClose={this.cancelAdding.bind(this)} />
      	);
	}

	openInfo() {
		return (
        	<Info saveInfo={this.saveInfo.bind(this)} 
        	router={this.props.router}
        	event_name={this.state.event_name}
			stuff={this.state.stuff}
		    people={this.state.people}
		    place={this.state.place} 
		    onClose={this.cancelAdding.bind(this)} />
      	);
	}

	openSaveEvent() {
		return (
		    <SaveEvent event_name={this.state.event_name}
		    stuff={this.state.stuff}
		    people={this.state.people}
		    place={this.state.place}
		    special_info={this.state.info}
			onClose={this.cancelAdding.bind(this)}/>
		);
	}

	cancelAdding(){
		this.props.router.push({
			pathname: '/'
		})
	}


  render() {
  	if(this.state.organizerOpened) {
  		return this.openOrganizer();
  	}
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
  	else
  		return this.openSaveEvent();
  }
}

export default CreateParty;
