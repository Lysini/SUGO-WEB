import React, { Component } from 'react';
import { Link } from 'react-router';
import './User.css';
import ChangePasswordModal from './ChangePasswordModal';

class User extends Component {
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
  }

  render() {
    return (
	 	<div className="background">
    {(this.state.showChangePasswordModal) ? <ChangePasswordModal oldPassword={this.state.oldPassword} onClose={() =>this.setState({showChangePasswordModal: false})}/> : null}
	      <div className="container userInfo">
	      	<h1 className="text-center">Dane Uzytkownika</h1>
          <div className="col-sm-6 text-center pull-left">
  	      	<form>
              <img className="avatar" src={`${this.state.avatar}`}/>
              <input ref="file" type="file"  name="user[image]" multiple="true" onChange={this.getAvatar.bind(this)}/> 
      			</form>
            {(this.state.updateAvatarActivity) ? <button className="btn pull-right" onClick={this.updateUserAvatar.bind(this)}>Save Avatar</button> : null}
        </div>
        <div className="col-sm-6 text-center pull-right">
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
            <button className="btn pull-right" onClick={() => this.setState({showChangePasswordModal: true})}>Change password</button>
        </div>
	      </div>
	    </div>
    );
  }
}

export default User;