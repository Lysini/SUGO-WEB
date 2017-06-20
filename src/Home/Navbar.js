import React, { Component } from 'react';
import { Link } from 'react-router';
import './Navbar.css';
import MyProfileDropDown from './MyProfileDropDown';
import '../index.css';
import LogInModal from './LogInModal';


class Navbar extends Component {

	constructor(){
		super();
		this.state ={
			showLogInModal: false,
			logged: false,
			burgerMenuOpened: false
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
	      this.setState({logged: false, burgerMenuOpened: false})
	      this.props.router.push({
	                pathname: '/'
	      });
	}

	showLogInModal() {
	    this.setState({
	      showLogInModal: true,
	      burgerMenuOpened: false
	    });
	}

	showLogInModalCreate() {
	    if(localStorage.getItem("userId") !== null){
        	this.props.router.push({
        		pathname: '/create'
        	})
     	}else{
          	this.setState({
          		createPartyActivity: true,
	      		showLogInModal: true
	    });
      	}
	}

	backToHome(){
		this.props.router.push({ pathname: '/' });
	}

	componentWillMount(){
    	this.checkLogInActive();
  	}

  	openUserInfo(){
    	this.props.router.push({ pathname: '/user' });
  	}

  	openUserEvents(){
	    this.props.router.push({ pathname: '/user/events' });
	}
	
		

	render() {
	    return (
				<nav className="navbar navbar-default navbar">
					<LogInModal router={this.props.router} showActivity={this.state.showLogInModal} onClose={() => this.setState({showLogInModal: false})} createPartyActivity={this.state.createPartyActivity} checkLogInActive={this.checkLogInActive.bind(this)}/>
					<div className="container">
				    	<div className="navbar-header">
				      		<button type="button" className="navbar-toggle collapsed" onClick={() => this.setState({burgerMenuOpened: !this.state.burgerMenuOpened})} data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
				       			<span className="sr-only">Toggle navigation</span>
				        		<span className="icon-bar"></span>
				        		<span className="icon-bar"></span>
				        		<span className="icon-bar"></span>
				      		</button>
				      		<a className="navbar-brand" href="#"><Link to={`/`}>SUGO</Link></a>
				   	 	</div>
				   		<div className="collapse navbar-collapse navbar-content" id="bs-example-navbar-collapse-1">
				    		<ul className="nav navbar-nav navbar-right">
						      	<li><a href="#" onClick={this.backToHome.bind(this)}>Home</a></li>
						        <li><a href="#">O Nas</a></li>
						        <li><a href="#">Kontakt</a></li>
						        <li><a href="#" onClick={this.showLogInModalCreate.bind(this)}>Dodaj Wydarzenie +</a></li>
						        { (this.state.logged) ? <li className="dropdown-style"><MyProfileDropDown logOut={this.logOut.bind(this)} router={this.props.router}/></li> 
						        : <li><a href="#" onClick={this.showLogInModal.bind(this)}>Log In</a></li>
							    }
				    		</ul>
				    	</div>
				    	{(this.state.burgerMenuOpened) ?
							<div className="collapse navbar-collapse burger-menu" id="bs-example-navbar-collapse-1">
						    	<ul className="nav navbar-nav navbar-right burger-menu-content">
								    <li><a href="#" onClick={this.backToHome.bind(this)}>Home</a></li>
								    <li><a href="#">O Nas</a></li>
								    <li><a href="#">Kontakt</a></li>
								    <li><a href="#" onClick={this.showLogInModalCreate.bind(this)}>Dodaj Wydarzenie +</a></li>
									<li className={(this.state.logged ? 'show' : 'hidden')}><a href="#" onClick={this.openUserInfo.bind(this)} >Mój Profil</a></li>
									<li className={(this.state.logged ? 'show' : 'hidden')}><a href="#" onClick={this.openUserEvents.bind(this)}>Moje Wydarzenia</a></li>
									<li className={(this.state.logged ? 'hidden' : 'show')}><a href="#" onClick={this.showLogInModal.bind(this)}>Zaloguj Się</a></li>
									<li className={(this.state.logged ? 'show' : 'hidden')}><a href="#" onClick={this.logOut.bind(this)}>Wyloguj Się</a></li>
						    	</ul>
						    </div>
						: null
						}
				  	</div>
				</nav>
    	);
	}
}

export default Navbar;
