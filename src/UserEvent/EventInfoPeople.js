import React, { Component } from 'react';
import { Link } from 'react-router';
import './Event.css';
import Navbar from '../Home/Navbar';
import config from '../config';
import ReactModal from 'react-modal';

class EventInfoPeople extends Component {
  constructor() {
      super();
      this.state = {
          changesActivity: false,
          selectedPerson: 0,
          showModal: false
      };
  }


  componentWillMount(){
      this.setState({
          peopleMen: this.props.people.peopleMen,
          peopleWomen: this.props.people.peopleWomen
      });
      console.log(this.state.peopleWomen);
  }

  saveUpUser() {
    let person = {
      peopleName: this.state.inputName,
      peopleNote: this.state.inputNote
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
      inputName: '',
      inputNote: '',
      changesActivity: true
    });
  }

  deleteUser(){
    if(this.state.peopleSex==='men'){
      this.state.peopleMen.splice(this.state.selectedPerson,1);
    }
    else {
      this.state.peopleWomen.splice(this.state.selectedPerson,1);
    }
    this.setState({changesActivity: true});
  }

  updateUser(){
    if(this.state.peopleSex === "men") {
      this.state.peopleMen[this.state.selectedPerson].peopleName=this.state.inputName;
      this.state.peopleMen[this.state.selectedPerson].peopleNote=this.state.inputNote;  
    }
    else {
      this.state.peopleWomen[this.state.selectedPerson].peopleName=this.state.inputName;
      this.state.peopleWomen[this.state.selectedPerson].peopleNote=this.state.inputNote;
    }
    this.setState({ 
      showModal: false,
      inputName: '',
      inputNote: '' ,
      changesActivity: true
    });
  }

  updateEventPeople() {
    var eventId = this.props.eventId;
    fetch(`${config.apiUrl}/event/${eventId}/update/people`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify({
        people: {
            peopleMen: this.state.peopleMen,
            peopleWomen: this.state.peopleWomen
        }
      })
    })
    .then(
        response => {
            const status = response.status;
            if (status === 200) {
              return response.json();
            }
      })
      .then(responseData =>{
          this.setState({changesActivity: false});
          this.props.reFetchEvent;
      });
    }

  render(){
    return(
    	<div>
        <div>
        	<div className="col-sm-4 text-center">
           		<div className="people-men-box">
                    <h1>Mężczyźni: <i className="fa fa-plus add-people-button" onClick={showModal => this.setState({showModal: true, peopleSex: 'men', modalTitle: 'Dodaj uczestnika', updateActive: false, inputName: '', inputNote: ''})} aria-hidden="true"></i></h1>
                    <div className="people-men-list">
                        <div className="jumbotron text-center">
                            {this.state.peopleMen.map((peopleItem, peopleIndex) => {
                                return (
                                    <div className="page-header">
                                        <p>Imie: {this.state.peopleMen[peopleIndex].peopleName} <button className="btn fa fa-pencil-square-o pull-right" onClick={() => this.setState({peopleSex: 'men', selectedPerson: peopleIndex, showModal:true, inputName: this.state.peopleMen[peopleIndex].peopleName, inputNote: this.state.peopleMen[peopleIndex].peopleNote, modalTitle: 'Edytuj uczestnika', updateActive: true})} aria-hidden="true"></button></p> 
                                        <p>Notka: {this.state.peopleMen[peopleIndex].peopleNote} <button className="btn fa fa-trash pull-right" onClick={() => { this.setState({peopleSex: 'men' ,selectedPerson: peopleIndex}, this.deleteUser.bind(this))}} aria-hidden="true"></button></p>
                                    </div> 
                                  	);
                                })
                            }
                        </div>
                    </div>  
                </div> 
            </div> 
            <div className="col-sm-4 text-center">
                <div className="people-women-box">
                    <h1>Kobiety: <i className="fa fa-plus add-people-button" onClick={showModal => this.setState({showModal: true, peopleSex: 'women', modalTitle: 'Dodaj uczestniczke', updateActive: false, inputName: '', inputNote: ''})} aria-hidden="true"></i> </h1>
                    <div className="people-women-list">
                        {this.state.peopleWomen.map((peopleItem, peopleIndex) => {
                            return (
                                <div className="page-header">
                                    <p>Imie: {this.state.peopleWomen[peopleIndex].peopleName} <button className="btn fa fa-pencil-square-o pull-right" onClick={() => this.setState({peopleSex: 'women', selectedPerson: peopleIndex, showModal:true, inputName: this.state.peopleWomen[peopleIndex].peopleName, inputNote: this.state.peopleWomen[peopleIndex].peopleNote, modalTitle: 'Edytuj uczestnika', updateActive: true})} aria-hidden="true"></button></p> 
                                    <p>Notka: {this.state.peopleWomen[peopleIndex].peopleNote} <button className="btn fa fa-trash pull-right" onClick={() => { this.setState({peopleSex: 'women' ,selectedPerson: peopleIndex}, this.deleteUser.bind(this))}} aria-hidden="true"></button></p> 
                                </div> 
                                );
                            })
                        }
                    </div>
                </div>
            </div>
          </div>
          {(this.state.changesActivity) ? <button className="btn" onClick={this.updateEventPeople.bind(this)}>Zapisz zmiany</button> : null}
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
        </div>
    );
  }
}

export default EventInfoPeople;