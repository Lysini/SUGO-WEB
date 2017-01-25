import React, { Component } from 'react';
import ReactModal from 'react-modal';


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
			numberOfUsers: 0,
			peopleWomen: [],
			peopleMen: [],
			assistantNumber: 0
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
			peopleSex: this.state.peopleSex,
			peopleNote: this.state.inputNote,
			numberOfUsers: this.state.numberOfUsers+1
		};
		if(this.state.peopleSex === "men") {
			this.state.peopleMen.push(person);
		}
		else {
			this.state.peopleWomen.push(person);
		}
		this.setState({ 
			added: true, 
			showModal: false,
			numberOfUsers: this.state.numberOfUsers+1,
			inputName: '',
			inputNote: '' 
		});
	}

	multipleAdd(){
		if(this.state.multipleAddStatus===false){
			this.setState({multipleAddStatus: true})
		}
		else if(this.state.multipleAddStatus===true){
			this.setState({multipleAddStatus: false})
		}
	}

	deleteUser(){
		if(this.state.peopleSex==='men'){
			this.state.peopleMen.splice(this.state.editOrDeleteNumber,1);
			this.setState({deleteStatus: false});

		}
		else if(this.state.peopleSex==='women'){
			this.state.peopleWomen.splice(this.state.editOrDeleteNumber,1);
		}
	}

	updateUser(){
		let person = {
			peopleName: this.state.inputName,
			peopleSex: this.state.peopleSex,
			peopleNote: this.state.inputNote,
			numberOfUsers: this.state.numberOfUsers+1
		};
		if(this.state.peopleSex === "men") {
			this.state.peopleMen[this.state.assistantNumber]=person;
		}
		else {
			this.state.peopleWomen[this.state.assistantNumber]=person;
		}
		this.setState({ 
			showModal: false,
			inputName: '',
			inputNote: '' 
		});
	}

  render() {
    return (
		<div className="openedPlace">
			<div className="container pull-left">
				<div className="col-sm-4 people-info">
					<h2>Organizator</h2>
					<p>Imie</p>
					<p>Nazwisko</p>
					<p>Info</p>
				</div>
			</div>
			<h className="title">People</h>
	      	<div className="PlaceClose" onClick={this.props.onClose}>
	     		<div className="close-left"></div>
	      		<div className="close-right"></div>
	      	</div> 
			<div className="container ">
				<div className="row">
					<div className="col-sm-12 col-md-6 text-center">
					   	<h1 className="people-men">Mężczyźni <i className="fa fa-plus add-people-button" onClick={showModal => this.setState({showModal: true, peopleSex: 'men', modalTitle: 'Dodaj uczestnika', updateActive: false, inputName: '', inputNote: ''})} aria-hidden="true"></i></h1>
					   	<div className="people-men-1">
							{(this.state.added) ? 
				                this.state.peopleMen.map((item, itemIndex) => {
									return (
										<div>
											<p>Imie: {this.state.peopleMen[itemIndex].peopleName} <button className="btn fa fa-pencil-square-o" onClick={() => this.setState({peopleSex: 'men', assistantNumber:itemIndex, showModal:true, inputName: this.state.peopleMen[itemIndex].peopleName, inputNote: this.state.peopleMen[itemIndex].peopleNote, modalTitle: 'Edytuj uczestnika', updateActive: true})} aria-hidden="true"></button></p> 
								          	<p>Notka: {this.state.peopleMen[itemIndex].peopleNote} <button className="btn fa fa-trash" onClick={() => { this.setState({editOrDeleteNumber: itemIndex}, this.deleteUser.bind(this))}} aria-hidden="true"></button></p>
								          	
								       	</div>
							        );
							    }) : null
						    }
						</div>
					</div>
					<div className="col-sm-12 col-md-6 text-center">
						<h1 className="people-women">Kobiety <i className="fa fa-plus add-people-button" onClick={showModal => this.setState({showModal: true, peopleSex: 'women', modalTitle: 'Dodaj uczestnika', updateActive: false, inputName: '', inputNote: ''})} aria-hidden="true"></i> </h1>   
						<div className="people-women-1">
							{(this.state.added) ? 
			               		this.state.peopleWomen.map((item, itemIndex) => {
									return (
										<div>
							            	<p>Imie: {this.state.peopleWomen[itemIndex].peopleName} <button className="fa fa-pencil-square-o" onClick={() => this.setState({peopleSex: 'women', assistantNumber:itemIndex, showModal:true, inputName: this.state.peopleWomen[itemIndex].peopleName, inputNote: this.state.peopleWomen[itemIndex].peopleNote, modalTitle: 'Edytuj uczestnika', updateActive: true})} aria-hidden="true"></button></p> 
							           		<p>Notka: {this.state.peopleWomen[itemIndex].peopleNote} <button className="fa fa-trash" onClick={() => { this.setState({editOrDeleteNumber: itemIndex}, this.deleteUser.bind(this))}} aria-hidden="true"></button></p> 
							        	</div>
						        	);
						    	}) : null
					    	}
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
							<button className="btn pull-right modal-save" type="button" onClick={(this.state.updateActive) ? this.updateUser.bind(this) : this.saveUpUser.bind(this)}>Save</button>
						</form>
					</div>
		        </ReactModal>
		    <button className="btn PlaceSave" onClick={this.saveUp.bind(this)}>Next</button>
      	</div>

    );
  }
}

export default People;