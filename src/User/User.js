import React, { Component } from 'react';
import { Link } from 'react-router';
import './User.css';
import UserUpdate from './UserUpdate';

class User extends Component {
	constructor() {
	    super();
	    this.state = {
			dataLoaded: false
	    };
	    this.fetchUserData = this.fetchUserData.bind(this);
	}

	fetchUserData(userId) {
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
        this.setState({ userData: responseData.data,
        				dataLoaded: true });
      });
	}

  componentWillMount() {
    var userId = localStorage.getItem("userId");
	this.fetchUserData(userId);
	console.log(userId);
  }

  render() {
    return (
	 	<div className="background">
	      <div className="container">
	    	<li><a href="#"><Link to={`user/events`}>UserEvents</Link></a></li>
	      	<h1 className="text-center">Informacje o użytkowniku</h1>
	      	<div className="container">
		      	<div className="jumbotron">
				{
					(this.state.dataLoaded) ?
						<div className="well">
						    <p className="event-name">{this.state.userData.name}</p>
						</div>
					: <img src="http://rpg.drivethrustuff.com/shared_images/ajax-loader.gif"/>
				}	
		      	</div>
		    </div>
		    <UserUpdate/>
	      </div>
	    </div>
    );
  }
}

export default User;
