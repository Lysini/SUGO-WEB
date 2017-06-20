import React, { Component } from 'react';
import './User.css';
import ChangePasswordModal from './ChangePasswordModal';
import config from '../config';

class UserProfileContent extends Component {
	constructor() {
	    super();
	    this.state = {
			 updateActivity: false,
       showChangePasswordModal: false,
       updateAvatarActivity: false
	    };
	}

	fetchUserData() {
	var userId = localStorage.getItem("userId");
      fetch(`${config.apiUrl}/user/${userId}`,{
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
  if(this.validateUserInfo(this.state.name, this.state.age, this.state.note)){
    var userId = localStorage.getItem("userId");
    fetch(`${config.apiUrl}/user/${userId}/update`,{
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
  }

  updateUserAvatar() {
    var userId = localStorage.getItem("userId");
    fetch(`${config.apiUrl}/user/${userId}/update-avatar`,{
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
        this.setState({updateAvatarActivity: false});
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
          updateAvatarActivity: true
        })
      }.bind(this);
    console.log(url);
  }

  validateUserInfo(name, age, note) {
      var allowedNameChars = new RegExp("^([A-Za-z]{3,20})$"); 
      var allowedAgeChars = new RegExp("^([0-9]{1,2})$"); 
      var allowedNoteChars = new RegExp("^([A-Za-z0-9]{0,150})$"); 
      if (!allowedNameChars.test(name)) {
        this.setState({ validNameErrorText: 'Nazwa może zawierać od 3 do 20 liter.' });
      }
      else{
        this.setState({ validNameErrorText: '' });
      }
      if (!allowedAgeChars.test(age)) {
        this.setState({ validAgeErrorText: 'Wiek może być nie większy niż 99.' });
      }
      else{
        this.setState({ validAgeErrorText: '' });
      }
      if (!allowedNoteChars.test(name)) {
        this.setState({ validNoteErrorText: 'Notatka może mieć maksymalnie 150 cyfr i liter' });
      }
      else{
        this.setState({ validNoteErrorText: '' });
      }
      if(allowedNameChars.test(name) && allowedAgeChars.test(age) && allowedNoteChars.test(note)) {
        return true;
      }
      return false;
  }

  render() {
    return (
	 	<div className="user-profile-box">
    {(this.state.showChangePasswordModal) ? <ChangePasswordModal oldPassword={this.state.oldPassword} onClose={() =>this.setState({showChangePasswordModal: false})}/> : null}
	      <div className="container userInfo">
	      	<h1 className="text-center">Dane Uzytkownika</h1>
          <div className="profile-info">
            <div className="col-sm-6 text-center">
    	      	<form>
                <img role="presentation" className="avatar" src={`${this.state.avatar}`}/>
                <input ref="file" type="file"  name="user[image]" multiple="true" onChange={this.getAvatar.bind(this)}/> 
        			</form>
              {(this.state.updateAvatarActivity) ? <button className="btn pull-right" onClick={this.updateUserAvatar.bind(this)}>Save Avatar</button> : null}
            </div>
            <div className="col-sm-6 text-center">
              <form>
                  <div className="form-group">
                  <label>Name:</label>
                  <input className="form-control" onChange={name => this.setState({ name:name.target.value, updateActivity: true })} value={this.state.name} />
                </div>
                <div className="form-group">
                  <label>Age:</label>
                  <input className="form-control" onChange={age => this.setState({ age:age.target.value, updateActivity: true })} value={this.state.age} />
                </div>
                <div className="form-group">
                  <label>Note:</label>
                  <textarea className="form-control note-textarea" onChange={note => this.setState({ note:note.target.value, updateActivity: true })} value={this.state.note} />
                </div>
              </form>
              {(this.state.updateActivity) ? <button className="btn pull-right" onClick={this.updateUser.bind(this)}>Save</button> : null}
              <button className="btn pull-right save-button" onClick={() => this.setState({showChangePasswordModal: true})}>Change password</button>
              <div className="form-group error-box">
                <p className="error-text">{this.state.validNameErrorText}</p>
                <p className="error-text">{this.state.validAgeErrorText}</p>
                <p className="error-text">{this.state.validNoteErrorText}</p>
              </div>
            </div>
          </div>
	      </div>
	    </div>
    );
  }
}

export default UserProfileContent;