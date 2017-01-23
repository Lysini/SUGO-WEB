import React, { Component } from 'react';
import ReactModal from 'react-modal';


class People extends Component {
	constructor() {
		super();
		this.state = {
			showModal: false,
			added: false,
			peopleSex: 'men',
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

  render() {
    return (
		<div className="openedPlace">
			<div className="container pull-left">
				<div className="col-sm-4 people-info">
					<h1>Info o Organizatorze</h1>
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
					   	<h1 className="people-men">Mężczyźni <button className="btn " onClick={showModal => this.setState({showModal: true, peopleSex: 'men'})}>+</button></h1>
					   	<div className="people-men-1">
							{(this.state.added) ? 
				                this.state.peopleMen.map((item, itemIndex) => {
									return (
										<div>
											<p>Imie: {this.state.peopleMen[itemIndex].peopleName}</p> 
								          	<p>Notka: {this.state.peopleMen[itemIndex].peopleNote}</p>
								       	</div>
							        );
							    }) : null
						    }
						</div>
					</div>
					<div className="col-sm-12 col-md-6 text-center">
						<h1 className="people-women">Kobiety <button className="btn " onClick={showModal => this.setState({showModal: true, peopleSex: 'women'})}>+</button></h1>   
						<div className="people-women-1">
							{(this.state.added) ? 
			               		this.state.peopleWomen.map((item, itemIndex) => {
									return (
										<div>
							            	<p>Imie: {this.state.peopleWomen[itemIndex].peopleName}</p> 
							           		<p>Notka: {this.state.peopleWomen[itemIndex].peopleNote}</p> 
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
					    <h4 className="modal-title" id="myModalLabel">Dodaj Uczestnika</h4>
					    <span className="pull-right" onClick={()=> this.setState({showModal: false})} aria-hidden="true">X</span>
					</div>
					<div className="modal-form-container">
						<form>
				   			<div className="form-group text-center">
								<label>Imię i nazwisko lub pseudonim:</label>
								<input type="text" className="form-control PlaceText" onChange={inputName => this.setState({ inputName:inputName.target.value })} value={this.state.inputName}/>
							</div>
							<div className="form-group text-center">
								<label>Notatki:</label>
								<input type="text" className="form-control PlaceText" onChange={inputNote => this.setState({ inputNote:inputNote.target.value })} value={this.state.inputNote} />
							</div>
							<button className="btn pull-right" type="button" onClick={this.saveUpUser.bind(this)}>Save</button>
						</form>
					</div>
		        </ReactModal>  
		    <button className="btn PlaceSave" onClick={this.saveUp.bind(this)}>Next</button>
      	</div>

    );
  }
}

export default People;