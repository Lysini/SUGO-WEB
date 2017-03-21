import React, { Component } from 'react';
import { Link } from 'react-router';
import './Navbar.css';
import DropDown from './DropDown';
import '../index.css';
import ReactModal from 'react-modal';
import LogInModal from './LogInModal';


class Navbar extends Component {

	constructor(){
		super();
		this.state ={
			showLogInModal: false,
			logged: false,
		}

	}

	checkLogInActive(){
	    if(localStorage.getItem("userId") !== null){
	      this.setState({logged: true})
	    }
	    else{
	      this.setState({logged: false})
	    }
	}

	logOut(){
	      localStorage.removeItem("userId");
	      this.setState({logged: false})
	      this.props.router.push({
	                pathname: '/'
	      });
	}

	showLogInModal() {
	    this.setState({
	      showLogInModal: true
	    });
	}

	showLogInModalCreate() {
	    if(localStorage.getItem("userId") !== null){
        	this.props.router.push({
        		pathname: '/organizer'
        	})
     	}else{
          	this.setState({
          		createPartyActivity: true,
	      		showLogInModal: true
	    });
      	}
	}

	openUserEvents(){
		this.props.router.push({ pathname: '/user/events' });
	}

	openUserInfo(){
		this.props.router.push({ pathname: '/user' });
	}
	backToHome(){
		this.props.router.push({ pathname: '/' });
	}

	componentWillMount(){
    	this.checkLogInActive();
  	}
	
		

	render() {
	    return (
			<nav className="navbar navbar-default navbar">
			<LogInModal router={this.props.router} showActivity={this.state.showLogInModal}  onClose={()=>{this.setState({ showLogInModal: false })}} createPartyActivity={this.state.createPartyActivity} checkLogInActive={this.checkLogInActive.bind(this)}/>
			  <div className="container">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
			        <span className="sr-only">Toggle navigation</span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			      </button>
			      <a className="navbar-brand" href="#"><Link to={`/`}>SUGO</Link></a>
			    </div>
			    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			      <ul className="nav navbar-nav navbar-right">
			      	<li><a onClick={this.backToHome.bind(this)}>Home</a></li>
			        <li><a href="#">About App</a></li>
			        <li><a href="#">Contact Us</a></li>
			        <li><a href="#" onClick={this.showLogInModalCreate.bind(this)}>Create Party +</a></li>
			        <li><a onClick={this.openUserEvents.bind(this)}>UserEvents</a></li>
			        {(this.state.logged||this.props.myaccount) ?
			        	<li><a onClick={this.openUserInfo.bind(this)}>User</a></li>
			        : null
			        }
			        <li><a href="#">PL/EN</a></li>
			        {(this.props.myaccount) ? 
			        	<li><a href="#" onClick={this.logOut.bind(this)}>Log Out</a></li>
				        :  (this.state.logged) ? <li className="dropdown-style"><DropDown logOut={this.logOut.bind(this)} router={this.props.router}/></li> : <li><a href="#" onClick={this.showLogInModal.bind(this)}>Log In</a></li>
				    }
			      </ul>
			    </div>
			  </div>
			</nav>
    	);
	}
}

export default Navbar;
