import React, { Component } from 'react';
import './User.css';
import ReactModal from 'react-modal'; 
import config from '../config';

class ChangePasswordModal extends Component {
	constructor() {
	    super();
	    this.state = {
        showChangePasswordModal: true,
        newPassword: '',
        newPasswordConfirmation: '',
        updateActivity: false
      };
  }
  changePassword() {
    if(this.validatePassword(this.state.newPassword, this.state.newPasswordConfirmation)){
      var userId = localStorage.getItem("userId");
      fetch(`${config.apiUrl}/user/${userId}/change-password`,{
          headers: {
            'Accept': 'application/json',
             'Content-Type': 'application/json'
          },
          method: 'PUT',
          body: JSON.stringify({
            oldpassword: this.state.oldPassword,
            password: this.state.newPassword,
            password_confirmation: this.state.newPasswordConfirmation,
              
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
          this.setState({showChangePasswordModal: false});
        });
    }
  }


  componentWillMount() {
    this.setState({oldPassword:this.props.oldPassword})
  }

  validatePassword(newPassword, newPasswordConfirmation) {
      var allowedChars = new RegExp("^([A-Za-z0-9]{6,20})$"); 
      if (!allowedChars.test(newPassword)) {
        this.setState({ validNewPasswordErrorText: 'Hasło musi mieć od 6 do 12 liter i cyfr' });
      }
      else{
        this.setState({ validNewPasswordErrorText: '' });
      }
      if (newPassword !== newPasswordConfirmation) {
        this.setState({ validNewPasswordCompareErrorText: 'Nowe hasło nie jest zgodne z jego potwierdzeniem.' });
      }
      else{
          validNewPasswordCompareErrorText: ''
      }
      if(allowedChars.test(newPassword) && newPassword === newPasswordConfirmation) {
        return true;
      }
      return false;
  }

  render() {
    return (
		<ReactModal 
              isOpen={this.state.showChangePasswordModal}
              contentLabel="Inline Styles Modal Example"
              className="Modal"
              overlayClassName="Overlay">
            <div className="modal-header text-center">
              <h4 className="modal-title" id="myModalLabel">Zmień hasło</h4>
              <span className="fa fa-times" onClick={this.props.onClose} aria-hidden="true"/>
            </div>
            <div className="modal-form-container">
              <form>
                <div className="form-group">
                  <label>Aktualne Hasło:</label>
                  <input className="form-control password-input" onChange={oldPassword => this.setState({ oldPassword:oldPassword.target.value, updateActivity: true })} value={this.state.oldPassword} />
                </div>
                <div className="form-group">
                  <label>Nowe hasło:</label>
                  <input className="form-control password-input" onChange={newPassword => this.setState({ newPassword:newPassword.target.value, updateActivity: true })} value={this.state.newPassword} />
                </div>
                <div className="form-group">
                  <label>Potwierdź nowe hasło:</label>
                  <input className="form-control password-input" onChange={newPasswordConfirmation => this.setState({ newPasswordConfirmation:newPasswordConfirmation.target.value, updateActivity: true })} value={this.state.newPasswordConfirmation} />
                </div>
                <div className="form-group error-box">
                  <p className="error-text">{this.state.validNewPasswordErrorText}</p>
                  <p className="error-text">{this.state.validNewPasswordCompareErrorText}</p>
                </div>
              </form>
            </div>
              {(this.state.updateActivity) ? <button className="btn pull-right save-button confirm-password-change" onClick={this.changePassword.bind(this)}>Save</button> : null}
          </ReactModal>
    	);
  	}
}

export default ChangePasswordModal;