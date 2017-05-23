import React, { Component } from 'react';
import ReactModal from 'react-modal';
import './style.css';


class People extends Component {
	constructor() {
		super();
		this.state = {
			showModal: false,
			updateActive: false,
			modalTitle: 'Dodaj Uczestnika',
			deleteStatus: false,
			added: false,
			peopleSex: 'men',
			people: {
				peopleMen: [],
				peopleWomen: []
			},
			numberOfUsers: 0,
			assistantNumber: 0,
			validNameErrorText: '',
			validNoteErrorText: ''
		};
	}

	saveUp() {
		this.props.savePeople(
			this.state.people
			);
	}

	saveUpUser() {
		if(this.validateUser(this.state.inputName, this.state.inputNote)){
			let person = {
				peopleName: this.state.inputName,
				peopleNote: this.state.inputNote
			};
			if(this.state.peopleSex === "men") {
				this.state.people.peopleMen.push(person);
			}
			else {
				this.state.people.peopleWomen.push(person);
			}
			this.setState({ 
				added: true, 
				showModal: false,
				numberOfUsers: this.state.people.numberOfUsers+1,
				inputName: '',
				inputNote: '' 
			});
		}
	}

	deleteUser(){
		if(this.state.peopleSex==='men'){
			this.state.people.peopleMen.splice(this.state.editOrDeleteNumber,1);
		}
		else {
			this.state.people.peopleWomen.splice(this.state.editOrDeleteNumber,1);
		}
		this.setState({numberOfUsers: this.state.numberOfUsers-1});
	}

	updateUser(){
		if(this.validateUser(this.state.inputName, this.state.inputNote)){
			let person = {
				peopleName: this.state.inputName,
				peopleNote: this.state.inputNote,
			};
			if(this.state.peopleSex === "men") {
				this.state.people.peopleMen[this.state.assistantNumber]=person;
			}
			else {
				this.state.people.peopleWomen[this.state.assistantNumber]=person;
			}
			this.setState({ 
				showModal: false,
				inputName: '',
				inputNote: '' 
			});
		}
	}

	validateUser(inputName, inputNote) {
	    var allowedNameChars = new RegExp("^([A-Za-z]{3,20})$"); 
	    var allowedNoteChars = new RegExp("^([A-Za-z0-9]{0,150})$"); 
	    if (!allowedNameChars.test(inputName)) {
	      this.setState({ validNameErrorText: 'Nazwa użytkownika może zawierać od 3 do 20 znaków. Dopuszczalne znaki to litery.' });
	    }
	    else{
	    	this.setState({ validNameErrorText: '' });
	    }
	    if (!allowedNoteChars .test(inputNote)) {
	      this.setState({ validNoteErrorText: 'Notatka może zawierać maksymalnie 150 znaków. Dopuszczalne znaki to cyfry i litery.' });
	    }
	    else{
	    	this.setState({ validNoteErrorText: '' });
	    }
	    if(allowedNoteChars.test(inputNote) && allowedNameChars.test(inputName)) {
	      return true;
	    }
	    return false;
	}

  render() {
    return (
		<div className="openedPlace">
			<div className="container pull-left">
				<div className="col-sm-4 people-info">
					<h2>Organizator</h2>
					<p>{this.props.organizerName}</p>
					<p>{this.props.organizerNote}</p>
				</div>
			</div>
			<h className="title">People</h>
	      	<div className="PlaceClose" onClick={this.props.onClose}>
	     		<div className="close-left"></div>
	      		<div className="close-right"></div>
	      	</div> 
			<div className="container">
				<div className="row">
					<div className="col-sm-12 col-md-6 text-center">
						<div className="people-men">
						   	<h1>Mężczyźni: <i className="fa fa-plus add-people-button" onClick={showModal => this.setState({showModal: true, peopleSex: 'men', modalTitle: 'Dodaj uczestnika', updateActive: false, inputName: '', inputNote: ''})} aria-hidden="true"></i></h1>
						   	<div className="people-men-1">
						   		<div className="jumbotron text-center">
									{(this.state.added) ? 
						                this.state.people.peopleMen.map((item, itemIndex) => {
											return (
												<div>
													<p>Imie: {this.state.people.peopleMen[itemIndex].peopleName} <button className="btn fa fa-pencil-square-o pull-right" onClick={() => this.setState({peopleSex: 'men', assistantNumber:itemIndex, showModal:true, inputName: this.state.people.peopleMen[itemIndex].peopleName, inputNote: this.state.people.peopleMen[itemIndex].peopleNote, modalTitle: 'Edytuj uczestnika', updateActive: true})} aria-hidden="true"></button></p> 
										          	<p>Notka: {this.state.people.peopleMen[itemIndex].peopleNote} <button className="btn fa fa-trash pull-right" onClick={() => { this.setState({peopleSex: 'men' ,editOrDeleteNumber: itemIndex}, this.deleteUser.bind(this))}} aria-hidden="true"></button></p>
										       	</div>
									        );
									    }) : null
								    }
								</div>
							</div>
						</div>
					</div>
					<div className="col-sm-12 col-md-6 text-center">
						<div className="people-women">
						<h1>Kobiety <i className="fa fa-plus add-people-button" onClick={showModal => this.setState({showModal: true, peopleSex: 'women', modalTitle: 'Dodaj uczestnika', updateActive: false, inputName: '', inputNote: ''})} aria-hidden="true"></i> </h1>   
							<div className="people-women-1">
								<div className="jumbotron text-center">
									{(this.state.added) ? 
					               		this.state.people.peopleWomen.map((item, itemIndex) => {
											return (
												<div>
									            	<p>Imie: {this.state.people.peopleWomen[itemIndex].peopleName} <button className="btn fa fa-pencil-square-o pull-right" onClick={() => this.setState({peopleSex: 'women', assistantNumber:itemIndex, showModal:true, inputName: this.state.people.peopleWomen[itemIndex].peopleName, inputNote: this.state.people.peopleWomen[itemIndex].peopleNote, modalTitle: 'Edytuj uczestnika', updateActive: true})} aria-hidden="true"></button></p> 
									           		<p>Notka: {this.state.people.peopleWomen[itemIndex].peopleNote} <button className="btn fa fa-trash pull-right" onClick={() => { this.setState({peopleSex: 'women' ,editOrDeleteNumber: itemIndex}, this.deleteUser.bind(this))}} aria-hidden="true"></button></p> 
									        	</div>
								        	);
								    	}) : null
							    	}
							   	</div>
						    </div>
						</div>
					</div>
				</div>
			</div>	
			<ReactModal 
		        isOpen={this.state.showModal}
		        contentLabel="Inline Styles Modal Example"
		        className="Modal"
		        overlayClassName="Overlay">
					<div className="modal-header text-center">
						<h4 className="modal-title" id="myModalLabel">{this.state.modalTitle}</h4>
					    <span className="fa fa-times" onClick={()=> this.setState({showModal: false})} aria-hidden="true"/>
					</div>
					<div className="modal-form-container">
						<form>
				   			<div className="form-group text-center">
								<label>Imię i nazwisko lub pseudonim:</label>
								<input type="text" className="form-control modal-text" onChange={inputName => this.setState({ inputName:inputName.target.value })} value={this.state.inputName}/>
							</div>
							<div className="form-group text-center">
								<label>Notatki:</label>
								<input type="text" className="form-control modal-note" onChange={inputNote => this.setState({ inputNote:inputNote.target.value })} value={this.state.inputNote} />
							</div>
							<div className="form-group text-center">
								<p className="error-text" >{this.state.validNameErrorText}</p>
								<p className="error-text" >{this.state.validNoteErrorText}</p>
							</div>
							<button className="btn pull-right modal-save" type="button" onClick={(this.state.updateActive) ? this.updateUser.bind(this) : this.saveUpUser.bind(this)}>Save</button>
						</form>
					</div>
		        </ReactModal>
		    <button className="btn PlaceSave text-center" onClick={this.saveUp.bind(this)}>Next</button>
      	</div>

    );
  }
}

export default People;