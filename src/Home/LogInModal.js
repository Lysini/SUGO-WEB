import React, { Component } from 'react';
import './Home.css';
import { Link } from 'react-router';
import ReactModal from 'react-modal';

class LogInModal extends Component {
	constructor() {
	    super();
	    this.state = {
        showLogInModal: true,
        modalTitle: 'Log In',
        registerActive: false,
        inputEmail: '',
        inputNick: '',
        inputPassword: '',
        inputConfirmPassword: '',
      };
  }

  logIn(){
    fetch('http://localhost:8000/api/user/log-in',{
        method: 'GET'
        })
        .then(
            response => {
                  const status = response.status;
                  if (status === 200) {
                    return response.json();
                  }
        })
        .then(responseData => {
          console.log(responseData);
        });
  
    }


  render() {
    return (
		<ReactModal 
              isOpen={this.state.showLogInModal}
              contentLabel="Inline Styles Modal Example"
              className="Modal"
              overlayClassName="Overlay">
            <div className="modal-header text-center">
            <h4 className="modal-title" id="myModalLabel">{this.state.modalTitle}</h4>
              <span className="fa fa-times" onClick={this.props.onClose} aria-hidden="true"/>
          </div>
          <div className="modal-form-container">
            <form>
                <div className="form-group text-center">
                <label>Email:</label>
                <input type="text" className="form-control modal-text" onChange={inputEmail => this.setState({ inputEmail:inputEmail.target.value })} value={this.state.inputEmail}/>
              </div>
              <div className="form-group text-center">
                <label>Password:</label>
                <input type="text" className="form-control modal-text" onChange={inputPassword => this.setState({ inputPassword:inputPassword.target.value })} value={this.state.inputPassword} />
              </div>
              {(this.state.registerActive) ?
                <div>
                <div className="form-group text-center">
                  <label>Confirm Password:</label>
                  <input type="text" className="form-control modal-text" onChange={inputConfirmPassword => this.setState({ inputConfirmPassword:inputConfirmPassword.target.value })} value={this.state.inputConfirmPassword} />
                </div>
                <div className="form-group text-center">
                  <label>Nickname:</label>
                  <input type="text" className="form-control modal-text" onChange={inputNick => this.setState({ inputNick:inputNick.target.value })} value={this.state.inputNick} />
                </div>
                </div>
              : null
              }
              
              <a href="#" onClick={() => this.setState({registerActive: true, modalTitle: 'Sign Up'})}>Sing Up</a><i> or </i><a href="#" onClick={() => this.setState({showLogInModal: false})}>Continue Anonymously</a>
              <button className="btn pull-right modal-save" onClick={this.logIn.bind(this)} type="button">{this.state.modalTitle}</button>
            </form>
          </div>
          </ReactModal>
    	);
  	}
}

export default LogInModal;