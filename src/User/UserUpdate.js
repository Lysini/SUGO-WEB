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
        this.setState({ name: responseData.data.name, age: responseData.data.age });
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
			age: this.state.age
            
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

  render() {
    return (
	 	<div className="background">
	      <div className="container userInfo">
	      	<h1 className="text-center">Dane Uzytkownika</h1>
	      	<form>
				<div className="form-group">
					<label>Name:</label>
					<input className="form-control" onChange={name => this.setState({ name:name.target.value, updateActivity: true })} value={this.state.name} />
				</div>
				<div className="form-group">
					<label>Age:</label>
					<input className="form-control" onChange={age => this.setState({ age:age.target.value, updateActivity: true })} value={this.state.age} />
				</div>
			</form>
			{(this.state.updateActivity) ? <button className="btn pull-right" onClick={this.updateUser.bind(this)}>Save</button> : null}
	      </div>
	    </div>
    );
  }
}

export default User;