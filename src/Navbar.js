import React, { Component } from 'react';
import { Link } from 'react-router';
import './Home.css';

class Navbar extends Component {
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
		        <li><a href="#"><Link to={`create`}>Create Party +</Link></a></li>
		        <li><a href="#">Log In</a></li>
		        <li><a href="#">PL/EN</a></li>
		      </ul>
		    </div>
		  </div>
		</nav>
    );
  }
}

export default Navbar;
