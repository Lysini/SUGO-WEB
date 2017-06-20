import React, { Component } from 'react';
import './User.css';
import UserProfileContent from './UserProfileContent';
import Navbar from '../Home/Navbar';
import config from '../config';

class UserProfile extends Component {
	constructor() {
	    super();
	    this.state = {
			dataLoaded: false
	    };
	    this.fetchUserData = this.fetchUserData.bind(this);
	}

	logOut(){
      localStorage.removeItem("userId");
      this.setState({logged: false})
      this.props.router.push({
                pathname: '/'
      });
  	}

	fetchUserData(userId) {
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
        this.setState({ userData: responseData.data,
        				dataLoaded: true });
      });
	}

	componentWillMount() {
	    var userId = localStorage.getItem("userId");
	    if(userId===null){
	    	this.props.router.push({
	                pathname: '/'
	      	});
	    }
		this.fetchUserData(userId);
		console.log(userId);
	}

  render() {
    return (
	 	<div className="background">
	      <div className="main-bg">
	      	<Navbar router={this.props.router} logOut={this.logOut.bind(this)} myaccount={true} logged={false}/>
	      	<div className="main-slogan">
		      	<div className="container">
			      	<div>
					{
						(this.state.dataLoaded) ?
							<UserProfileContent/>
						: <img role="presentation" src="../src/loader.gif"/>
					}	
			      	</div>
			    </div>
		      </div>
	      </div>
	    </div>
    );
  }
}

export default UserProfile;
