import React, { Component } from 'react';
import './Place.css';

class People extends Component {
	constructor() {
	    super();
	    this.state = {
	    	added: false,
	    	person: {
	    		peopleName: '',
			    peopleSex: '',
			    peopleNote: '',
			    numberOfUsers: 0
	    	},
	    	people: ["penis", "dupa"]
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
		this.setState({
				person: {
					peopleName: this.state.inputName,
					peopleSex: this.state.inputSex,
					peopleNote: this.state.inputNote,
					numberOfUsers: this.state.numberOfUsers+1
				}
		}, () => { console.log(this.state.person); this.setState({ people: this.state.people.push(this.state.person), added: true });});
		console.log(this.state.people[0]);
	}

  render() {
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
		    	this.state.people.map(function(item, key) {
		    		console.log(item, key);
				<tr key={key}> 
		            <th scope="row">{this.state.people[key].person.numberOfUsers}</th>  
		            <td>{this.state.people[key].person.peopleName}</td> 
		            <td>{this.state.people[key].person.peopleSex}</td>
		            <td>{this.state.people[key].person.peopleNote}</td> 
		        </tr>
		    	}) : null
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