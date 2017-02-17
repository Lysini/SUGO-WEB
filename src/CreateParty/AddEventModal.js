import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router';
import ReactModal from 'react-modal'; 

class AddEventModal extends Component {
	constructor() {
	    super();
	    this.state = {
        showModal: true,
        eventName: ''
      };
  }


  addEvent(){
  	this.props.saveName(
  		this.state.eventName
  		);
  }


  render() {
    return (
		<ReactModal 
              isOpen={this.state.showModal}
              contentLabel="Inline Styles Modal Example"
              className="Modal"
              overlayClassName="Overlay">
            <div className="modal-header text-center">
            <h4 className="modal-title" id="myModalLabel">Nadaj nazwe wydarzeniu</h4>
              <span className="fa fa-times" onClick={this.props.onClose} aria-hidden="true"/>
          </div>
          <div className="modal-form-container">
            <form>
                <div className="form-group text-center">
                <label>Nazwa Wydarzenia:</label>
                <input type="text" className="form-control modal-text" onChange={eventName => this.setState({ eventName:eventName.target.value })} value={this.state.eventName}/>
              </div>
              <button className="btn pull-right modal-save" onClick={this.addEvent.bind(this)}></button>
            </form>
          </div>
          </ReactModal>
    	);
  	}
}

export default AddEventModal;