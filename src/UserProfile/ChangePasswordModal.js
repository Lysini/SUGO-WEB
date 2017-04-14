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
    componentWillMount() {
      this.setState({oldPassword:this.props.oldPassword})
  }

  render() {
    return (
		<ReactModal 
              isOpen={this.state.showChangePasswordModal}
              contentLabel="Inline Styles Modal Example"
              className="Modal"
              overlayClassName="Overlay">
            <div className="modal-header text-center">
              <h4 className="modal-title" id="myModalLabel">Change Password</h4>
              <span className="fa fa-times" onClick={this.props.onClose} aria-hidden="true"/>
            </div>
            <div className="modal-form-container">
              <form>
                <div className="form-group">
                  <label>Old password:</label>
                  <input className="form-control" onChange={oldPassword => this.setState({ oldPassword:oldPassword.target.value, updateActivity: true })} value={this.state.oldPassword} />
                </div>
                <div className="form-group">
                  <label>New password:</label>
                  <input className="form-control" onChange={newPassword => this.setState({ newPassword:newPassword.target.value, updateActivity: true })} value={this.state.newPassword} />
                </div>
                <div className="form-group">
                  <label>Repeat new password:</label>
                  <input className="form-control" onChange={newPasswordConfirmation => this.setState({ newPasswordConfirmation:newPasswordConfirmation.target.value, updateActivity: true })} value={this.state.newPasswordConfirmation} />
                </div>
              </form>
              {(this.state.updateActivity) ? <button className="btn pull-right" onClick={this.changePassword.bind(this)}>Save</button> : null}
            </div>
          </ReactModal>
    	);
  	}
}

export default ChangePasswordModal;