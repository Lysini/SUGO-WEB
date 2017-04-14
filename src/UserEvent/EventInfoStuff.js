import React, { Component } from 'react';
import './Event.css';
import config from '../config';
import ReactModal from 'react-modal';

class EventInfoStuff extends Component {
  constructor() {
      super();
      this.state = {
          showModal: false,
          changesActivity: false,
          labelName: '',
          stuffName: '',
          stuffPrice: '',
          stuffAmount: ''
      };
  }

  componentWillMount(){
      this.setState({
          stuff: this.props.stuff
      });

  }

  updateEventStuff() {
    var eventId = this.props.params.id;
    fetch(`${config.apiUrl}/event/${eventId}/update/stuff`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify({
          stuff: this.state.stuff
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
        this.setState({editMode: false});
        this.props.reFetchEvent();
    });
  }

  addLabel(){
    let stuffLabel = {
      labelName: this.state.labelName,
      stuffArray: []
    };
    this.state.stuff.push(stuffLabel);
    this.setState({ labelName: '' });
  }

  addStuff(){
    let stuffItem = {
      stuffName: this.state.stuffName,
      stuffPrice: this.state.stuffPrice,
      stuffAmount: this.state.stuffAmount
    };
    this.state.stuff[this.state.selectedLabel].stuffArray.push(stuffItem);
        this.setState({ showModal: false, addLabel: false, addedLabel:true, stuffName:'', stuffPrice:'', stuffAmount:'', changesActivity: true });
  }

  updateStuff(){
    let stuffItem = {
      stuffName: this.state.stuffName,
      stuffPrice: this.state.stuffPrice,
      stuffAmount: this.state.stuffAmount
    };
    this.state.stuff[this.state.selectedLabel].stuffArray[this.state.selectedStuff]=stuffItem;
    this.setState({ 
      showModal: false,
      stuffName: '',
      stuffPrice: '',
      stuffAmount: '',
      changesActivity: true
    });
  }

  deleteStuff(){
      this.state.stuff[this.state.selectedLabel].stuffArray.splice(this.state.selectedStuff,1);
      this.setState({modalTitle: 'Dodaj Przedmiot', changesActivity: true});
  }

  updateEventStuff() {
    var eventId = this.props.eventId;
    fetch(`${config.apiUrl}/event/${eventId}/update/stuff`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify({
        stuff: this.state.stuff
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
          this.props.reFetchEvent();
      });
    }

  render(){
    return(
        <div>
          <div className="addLabel">
              <label>Dodaj Label:</label>
              <input type="text" className="form-control add-label-text" onChange={labelName => this.setState({ labelName:labelName.target.value })} value={this.state.labelName}/>
              <i className="fa fa-plus add-button" onClick={this.addLabel.bind(this)} aria-hidden="true"/>
              {(this.state.changesActivity) ?
                  <button className="btn" onClick={this.updateEventStuff.bind(this)}>Zapisz zmiany</button> 
                : null
              }
          </div>
        	<div className="row">
            <div className="labels-list">
              {this.state.stuff.map((stuffItem, stuffIndex) => {
                  return (
                      <div className="col-sm-4 pull-left text-center">
                        <div className="stuff-box">
                          <h1>{stuffItem.labelName}  <i className="fa fa-plus add-people-button" onClick={addStatus => this.setState({ showModal: true, selectedLabel: stuffIndex, modalTitle: 'Dodaj Przedmiot', editActive: false, stuffName: '', stuffPrice: '', stuffAmount: '' })} aria-hidden="true"></i></h1>
                          <div className="stuff-list">
                            <div className="jumbotron">
                              {stuffItem.stuffArray.map((stuffArrayItem, stuffArrayIndex) => {
                                return (
                                    <div className="page-header">
                                      <p>Nazwa: {stuffArrayItem.stuffName} <button className="btn fa fa-pencil-square-o pull-right" onClick={() => this.setState({selectedLabel: stuffIndex, selectedStuff: stuffArrayIndex, stuffName: this.state.stuff[stuffIndex].stuffArray[stuffArrayIndex].stuffName, stuffPrice: this.state.stuff[stuffIndex].stuffArray[stuffArrayIndex].stuffPrice, stuffAmount: this.state.stuff[stuffIndex].stuffArray[stuffArrayIndex].stuffAmount, showModal: true, editActive: true, modalTitle: 'Edytuj Przedmiot' })} aria-hidden="true"/></p>
                                      <p>Cena: {stuffArrayItem.stuffPrice} <button className="btn fa fa-trash pull-right" onClick={() =>{ this.setState({selectedLabel: stuffIndex, selectedStuff: stuffArrayIndex}, this.deleteStuff.bind(this))}} aria-hidden="true"></button></p>
                                      <p>Ilość: {stuffArrayItem.stuffAmount}</p>
                                    </div>  
                                );
                                })
                              }
                            </div>
                        	  </div>
                        </div>
                      </div>  
                      );
                  })
              }
            </div>

                <ReactModal 
                   isOpen={this.state.showModal}
                   contentLabel="Inline Styles Modal Example"
                   className="Modal-stuff"
                   overlayClassName="Overlay"
                >
                  <div className="modal-header text-center">
                       <h4 className="modal-title" id="myModalLabel">{this.state.modalTitle}</h4>
                       <span className="fa fa-times" onClick={()=> this.setState({showModal: false})} aria-hidden="true"/>
                  </div>
                  <div className="modal-form-container-stuff">
                    <form>
                      <div className="form-group">
                        <label>Nazwa:</label>
                        <input type="text" className="form-control modal-text" onChange={stuffName => this.setState({ stuffName:stuffName.target.value })} value={this.state.stuffName}/>
                      </div>
                      <div className="form-group">
                        <label>Cena:</label>
                        <input type="text" className="form-control modal-text" onChange={stuffPrice => this.setState({ stuffPrice:stuffPrice.target.value })} value={this.state.stuffPrice}/>
                      </div>
                      <div className="form-group">
                        <label>Ilość:</label>
                        <input type="text" className="form-control modal-text" onChange={stuffAmount => this.setState({ stuffAmount:stuffAmount.target.value })} value={this.state.stuffAmount}/>
                      </div>
                      <button className="btn pull-right modal-save" type="button" onClick={(this.state.editActive) ? this.updateStuff.bind(this) : this.addStuff.bind(this)}>Add</button>
                    </form> 
                    
                  </div>
                </ReactModal>
          </div>
        </div>
    );
  }
}
export default EventInfoStuff;