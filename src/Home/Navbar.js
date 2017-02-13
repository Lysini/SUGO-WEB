import React, { Component } from 'react';
import { Link } from 'react-router';
import './Home.css';
import Dropdown from 'react-dropdown';

class Navbar extends Component {

	showLogInModal() {
		this.props.showLogInModal(
	    );
	}

	logOut(){
		this.props.logOut();
	}

	openCreator(){
		if(localStorage.getItem("userId") !== null){
        	this.props.router.push({
        		pathname: '/create'
        	})
     	}else{
          	this.props.showLogInModalCreate();
      	}
	}

	render() {
	    return (
			<nav className="navbar navbar-default">
			  <div className="container">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
			        <span className="sr-only">Toggle navigation</span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			      </button>
			      <a className="navbar-brand" href="#">SUGO</a>
			    </div>
			    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			      <ul className="nav navbar-nav navbar-right">
			      	<li><a href="#">Home</a></li>
			        <li><a href="#">About App</a></li>
			        <li><a href="#">Contact Us</a></li>
			        <li><a href="#" onClick={this.openCreator.bind(this)}>Create Party +</a></li>
			        <li><a href="#"><Link to={`user/events`}>UserEvents</Link></a></li>
			        <li><a href="#">PL/EN</a></li>
			        <li><a href="#" onClick={this.showLogInModal.bind(this)}>Log In</a></li>
			        <li className="dropdown">
						<button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Dropdown Example</button>
						<ul className="dropdown-menu">
						    <li><a href="#">HTML</a></li>
						    <li><a href="#">CSS</a></li>
						    <li><a href="#" onClick={this.logOut.bind(this)}>Log out</a></li>
						</ul>
					</li>
			      </ul>
			    </div>
			  </div>
			</nav>
    	);
	}
}

export default Navbar;
