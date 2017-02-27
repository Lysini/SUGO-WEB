import React, { Component } from 'react';
import { Link } from 'react-router';
import './User.css';

class User extends Component {
	constructor() {
	    super();
	    this.state = {
			 updateActivity: false,
	    };
	}

	fetchUserData() {
	var userId = localStorage.getItem("userId");
      fetch(`http://localhost:8000/user/${userId}`,{
          method: 'GET'
      })
      .then(
        response => {
              const status = response.status;
              if(status===200){
                return response.json();
              }
      })
      .then(responseData =>{
        console.log(responseData);
        this.setState({ name: responseData.data.name, age: responseData.data.age, note: responseData.data.note, avatar: responseData.data.avatar });
	});
}


updateUser() {
	var userId = localStorage.getItem("userId");
    fetch(`http://localhost:8000/user/${userId}/update`,{
        headers: {
          'Accept': 'application/json',
           'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({
            name: this.state.name,
			      age: this.state.age,
            note: this.state.note,
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
        this.setState({updateActivity: false});
      });
  
    }

  updateUserAvatar() {
    var userId = localStorage.getItem("userId");
    fetch(`http://localhost:8000/user/${userId}/update-avatar`,{
        headers: {
          'Accept': 'application/json',
           'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({
          avatar: this.state.avatar[0]
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
        this.setState({updateActivity: false});
      });
  
    }

  changePassword() {
    var userId = localStorage.getItem("userId");
      fetch(`http://localhost:8000/user/${userId}/change-password`,{
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
          this.setState({updateActivity: false});
        });
    }

  componentWillMount() {
    	this.fetchUserData();
  }

  getAvatar(){
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

     reader.onloadend = function (e) {
        this.setState({
          avatar: [reader.result],
          updateActivity: true
        })
      }.bind(this);
  }

  render() {
    return (
	 	<div className="background">
	      <div className="container userInfo">
	      	<h1 className="text-center">Dane Uzytkownika</h1>
          <div className="col-sm-6 text-center pull-left">
  	      	<form>
              <img className="avatar" src={`${this.state.avatar}`}/>
              <input ref="file" type="file"  name="user[image]" multiple="true" onChange={this.getAvatar.bind(this)}/> 
      			</form>
            <button className="btn pull-right" onClick={this.updateUserAvatar.bind(this)}>Save Avatar</button>
        </div>
        <div className="col-sm-6 text-center pull-right">
            <form>
                <div className="form-group">
                <label>Name:</label>
                <input className="form-control" onChange={name => this.setState({ name:name.target.value, updateActivity: true })} value={this.state.name} />
              </div>
              <div className="form-group">
                <label>Note:</label>
                <input className="form-control" onChange={note => this.setState({ note:note.target.value, updateActivity: true })} value={this.state.note} />
              </div>
              <div className="form-group">
                <label>Age:</label>
                <input className="form-control" onChange={age => this.setState({ age:age.target.value, updateActivity: true })} value={this.state.age} />
              </div>
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
            {(this.state.updateActivity) ? <button className="btn pull-right" onClick={this.changePassword.bind(this)}>Change password</button> : null}
            {(this.state.updateActivity) ? <button className="btn pull-right" onClick={this.updateUser.bind(this)}>Save</button> : null}
        </div>
	      </div>
	    </div>
    );
  }
}

export default User;