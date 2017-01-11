import React, { Component } from 'react';
import './Place.css';

class People extends Component {
	constructor() {
	    super();
	    this.state = {
	    	added: false,
	    	inputSex: 'men',
	    	person: {
	    		peopleName: '',
			    peopleSex: 'men',
			    peopleNote: '',
			    numberOfUsers: 0
	    	},
	    	people: []
	    };
	}

	saveUp() {
		this.props.savePeople(
	      this.state.peopleName,
	      this.state.peopleSex,
	      this.state.peopleNote
	    );
	}

	saveUpUser() {
		const person = {
					peopleName: this.state.inputName,
					peopleSex: this.state.inputSex,
					peopleNote: this.state.inputNote,
					numberOfUsers: this.state.numberOfUsers+1
		};
		this.setState({ people: this.state.people.push(person), added: true });
		console.log(this.state.people[0].peopleName);
		this.state.people.map((item, itemIndex) => { console.log(item);console.log(itemIndex);});
		this.state.people.map((item, itemIndex) => { console.log(item);console.log(itemIndex);});
		this.state.people.map((item, itemIndex) => { console.log(item); console.log(itemIndex);});
}

  render() {
  		console.log(" W RENDERZE");
  		console.log(this.state.people);
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
						<label>Imię i nazwisko lub pseudonim:</label>
						<input type="text" className="form-control PlaceText" onChange={inputName => this.setState({ inputName:inputName.target.value })} value={this.state.inputName}/>
					</div>
			          <select onChange={inputSex => this.setState({ inputSex:inputSex.target.value })} value={this.state.inputSex}>
			            <option value="men">Mężczyzna</option>
			            <option value="women">Kobieta</option>
			          </select>
				    <div className="form-group">
						<label>Notatki:</label>
						<input type="text" className="form-control PlaceText" onChange={inputNote => this.setState({ inputNote:inputNote.target.value })} value={this.state.inputNote} />
					</div>
					<button className="btn" type="button" onClick={this.saveUpUser.bind(this)}>Save</button>
					
				   </form>
		<table className="table"> 
		    <caption>Mężczyźni</caption> 
			    <thead> 
			        <tr> 
			            <th></th> 
			            <th>Dane uczestnika</th>  
			        </tr> 
			    </thead> 
		    <tbody> 
		    { (this.state.added) ? 
		    	(()=> {
		    		console.log("map sie odpala");
                  return this.state.people.map((item, itemIndex) => {
                  	console.log("map sie odpala");
					return (
						<tr key={itemIndex}> 
				            <th scope="row">{this.state.people[itemIndex].peopleName}</th>  
				            <td>{this.state.people[itemIndex].peopleName}</td> 
				            <td>{this.state.people[itemIndex].peopleSex}</td>
				            <td>{this.state.people[itemIndex].peopleNote}</td> 
				        </tr>
			        );
		    	})}) : null
		    }
		    </tbody> 
		</table> 
			   </div>
				<button className="btn PlaceSave" onClick={this.saveUp.bind(this)}>Save Up</button>
	      	</div>
      </div>
    );
  }
}

export default People;