import React, { Component } from 'react';
import './User.css';
import Navbar from '../Home/Navbar';
import config from '../config';

class PublicProfile extends Component {
	constructor() {
	    super();
	    this.state = {
			dataLoaded: false
	    };
	    this.fetchUserData = this.fetchUserData.bind(this);
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
	fetchEvents(userId) {
      fetch(`${config.apiUrl}/user/${userId}/events`,{
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
        this.setState({ userEvents: responseData.data,
                        dataLoaded: true });
      });
	}

	componentWillMount() {
		this.fetchUserData(this.props.params.id);
		this.fetchEvents(this.props.params.id);
	  }

	openEventInformation(selectedEvent) {
	    this.props.router.push({
	      pathname: `/user/event-info/${selectedEvent._id}`,
	      state: { 
	        eventInformation: selectedEvent
	      } 
	    })
	}

  render() {
    return (
	    <div className="main-bg">
	   		<Navbar router={this.props.router} myaccount={true} logged={false}/>
	      	<div className="container user-profile">
				{
				(this.state.dataLoaded) ?
					<div>
					    <h1 className="text-center">Dane Uzytkownika</h1>
				    	<div className="col-sm-6 text-center pull-left">
					  	    <form>
					            <img className="avatar" role="presentation" src={`${this.state.userData.avatar}`}/>
					            <div className="form-group">
					            	<label>Name: {this.state.userData.name}</label>
					            </div>
					            <div className="form-group">
					                <label>Age: {this.state.userData.age}</label>
					            </div>
					            <div className="form-group">
					                <label>Note: {this.state.userData.note}</label>
					            </div>
					      	</form>
				    	</div>
				    	<div className="col-sm-6 text-center">
				        	<form>
					            <h2>Eventy Uzytkownika</h2>
					            <div className="info-box">
						            {(this.state.dataLoaded) ?
					                  this.state.userEvents.map((item, itemIndex) => {
					                    return (
					                      <div className="page-header"> 
					                        <p className="event-name">Nazwa wydarzenia: {this.state.userEvents[itemIndex].event_name}</p>
					                        <i className="fa fa-plus" onClick={this.openEventInformation.bind(this, item)} aria-hidden="true"></i>
					                      </div>
					                    );
					                  }) : <img role="presentation" src="http://rpg.drivethrustuff.com/shared_images/ajax-loader.gif"/>
					                }
				                </div>
				        	</form>
				    	</div>
					</div>
					: <img role="presentation" src="../src/loader.gif"/>
				}
				</div>	
		</div>

    );
  }
}

export default PublicProfile;
