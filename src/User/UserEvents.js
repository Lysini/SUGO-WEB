import React, { Component } from 'react';
//import { Link } from 'react-router';

class UserEvents extends Component {
	constructor() {
	    super();
	    this.state = {

	    };

	    this.fetchEvents = this.fetchEvents.bind(this);
	}

	fetchEvents(userId) {
      fetch(`http://localhost:8000/user/${userId}/events`,{
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
        console.log(responseData)
      });
	}

	componentWillMount() {
    var userId = localStorage.getItem("userId");
		this.fetchEvents(userId);
  }




  render() {
  	console.log(this);
    return (
      <div className="container">
      	<h1 className="text-center">Podsumowanie</h1>
      </div>
    );
  }
}

export default UserEvents;
