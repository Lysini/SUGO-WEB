import React, { Component } from 'react';
import './Place.css';

class People extends Component {
	constructor() {
		super();
		this.state = {
			added: false,
			inputSex: 'men',
			numberOfUsers: 0,
			peopleWomen: [],
			peopleMen: []
		};
	}

	saveUp() {
		this.props.savePeople(
			this.state.peopleWomen,
			this.state.peopleMen,
			this.state.numberOfUsers
			);
	}

	saveUpUser() {
		let person = {
			peopleName: this.state.inputName,
			peopleSex: this.state.inputSex,
			peopleNote: this.state.inputNote,
			numberOfUsers: this.state.numberOfUsers+1
		};
		if(this.state.inputSex === "men") {
			this.state.peopleMen.push(person);
		}
		else {
			this.state.peopleWomen.push(person);
		}
		this.setState({ 
			added: true, 
			numberOfUsers: this.state.numberOfUsers+1,
			inputName: '',
			inputNote: '' 
		});
	}

  render() {
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
			</div>
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
                this.state.peopleMen.map((item, itemIndex) => {
					return (
						<tr key={itemIndex}> 
				            <td>{this.state.peopleMen[itemIndex].peopleName}</td> 
				            <td>{this.state.peopleMen[itemIndex].peopleSex}</td>
				            <td>{this.state.peopleMen[itemIndex].peopleNote}</td> 
						</tr>
			        );
			    }) : null
		    }
		    </tbody> 
		</table>
		<table className="table"> 
		    <caption>Kobiety</caption> 
			    <thead> 
			        <tr> 
			            <th></th> 
			            <th>Dane uczestnika</th>  
			        </tr> 
			    </thead> 
		    <tbody> 
			{ (this.state.added) ? 
                this.state.peopleWomen.map((item, itemIndex) => {
					return (
						<tr key={itemIndex}> 
				            <td>{this.state.peopleWomen[itemIndex].peopleName}</td> 
				            <td>{this.state.peopleWomen[itemIndex].peopleSex}</td>
				            <td>{this.state.peopleWomen[itemIndex].peopleNote}</td> 
						</tr>
			        );
			    }) : null
		    }
		    </tbody> 
		</table>  
				<button className="btn PlaceSave" onClick={this.saveUp.bind(this)}>Save Up</button>
	      	</div>
      </div>
    );
  }
}

export default People;