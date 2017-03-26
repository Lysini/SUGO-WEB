import React, { Component } from 'react';
import './Home.css';
import { Link } from 'react-router';
import ReactModal from 'react-modal'; 
import config from '../config'

class LogInModal extends Component {
	constructor() {
	    super();
	    this.state = {
        showLogInModal: true,
        modalTitle: 'Log In',
        registerActive: false,
        email: '',
        nick: '',
        password: '',
        confirmpassword: '',
        profileAdress: ''
      };
  }

  authenticateApiUser(email, password) {
    fetch(`${config.apiUrl}/user/log-in`,{
        headers: {
          'Accept': 'application/json',
           'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password
        })
      })
      .then(
          response => {
                const status = response.status;
                if (status === 200) {
                  return response.json();
                }
      })
      .then(responseData => {
        localStorage.setItem("userId", responseData.data.id);
        localStorage.setItem("name", responseData.data.name);
        console.log(responseData);
          this.props.router.push({
            pathname: '/',
          });
          this.props.onClose();
          this.setState({email: '', password: ''});
          if(this.props.createPartyActivity=== true){
            this.props.router.push({
                pathname: '/organizer'
            });
          }
          else{
            this.props.checkLogInActive();
          }
      });
  
    }

  addNewApiUser(email, password, confirmpassword, nick, profileAdress) {
    fetch(`${config.apiUrl}/user/sign-up`,{
        headers: {
          'Accept': 'application/json',
           'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            name: nick,
            email: email,
            password: password,
            password_confirmation: confirmpassword,
            login: profileAdress
            
        })
      })
      .then(
          response => {
                const status = response.status;
                if (status === 201) {
                  return response.json();
                }
      })
      .then(responseData =>{
        console.log(responseData)
        this.props.onClose();
      });
  
    }

    logInValidate() {
        let { email, password } = this.state;
        var allowedChars = new RegExp("^([A-Za-z0-9]{5,})$"); 
        if(email === '' || password === '') {
        this.setState({ validErrorText: 'Please fill all inputs' });
        }
        else if (!((email.includes("@")) && (email.includes(".")))) {
        this.setState({ validErrorText: 'Please enter a email', email: '' });
        }
        else if (password.length<6) {
        this.setState({ validErrorText: 'Your password must be at least 6 characters' });
        }
        else if (!allowedChars.test(password)) {
        this.setState({ validErrorText: 'Your password contain unallowed characters', password: '' });
        }
        else {
        this.setState({ validErrorText: '' });
                this.authenticateApiUser(email, password);
        }
    }

    signUpValidate() {
        let { email, password, confirmpassword, nick, profileAdress } = this.state;
        var allowedChars = new RegExp("^([A-Za-z0-9]{5,})$"); 
        if(email === '' || password === '' || confirmpassword === '' || nick === '') {
        this.setState({ validErrorText: 'Please fill all inputs' });
        }
        else if (!((email.includes("@")) && (email.includes(".")))) {
        this.setState({ validErrorText: 'Please enter a email', email: '' });
        }
        else if (password.length<6) {
        this.setState({ validErrorText: 'Your password must be at least 6 characters' });
        }
        else if (confirmpassword.length<6) {
        this.setState({ validErrorText: 'Your password must be at least 6 characters' });
        }
        else if (nick.length<4) {
        this.setState({ validErrorText: 'Your nick must be at least 4 characters' });
        }
        else if (!allowedChars.test(password)) {
        this.setState({ validErrorText: 'Your password contain unallowed characters', password: '' });
        }
        else if (profileAdress.length<4) {
        this.setState({ validErrorText: 'Your nick must be at least 4 characters' });
        }
        else {
        this.setState({ validErrorText: '' });
                this.addNewApiUser(email, password, confirmpassword, nick, profileAdress);
        }
    }

    continueAnonymously(){
      this.props.router.push({
             pathname: '/organizer'
        });
    }

  render() {
    return (
		<ReactModal 
              isOpen={this.props.showActivity}
              contentLabel="Inline Styles Modal Example"
              className="Modal"
              overlayClassName="Overlay">
            <div className="modal-header text-center">
            <h4 className="modal-title" id="myModalLabel">{this.state.modalTitle}</h4>
              <span className="fa fa-times" onClick={this.props.onClose} aria-hidden="true"/>
          </div>
          <div className="modal-form-container">
            <form>
                <div className="form-group text-center">
                <label>Email:</label>
                <input type="text" className="form-control modal-text" onChange={email => this.setState({ email:email.target.value })} value={this.state.email}/>
              </div>
              <div className="form-group text-center">
                <label>Password:</label>
                <input type="password" className="form-control modal-text" onChange={password => this.setState({ password:password.target.value })} value={this.state.password} />
              </div>
              {(this.state.registerActive) ?
                <div>
                <div className="form-group text-center">
                  <label>Confirm Password:</label>
                  <input type="password" className="form-control modal-text" onChange={confirmpassword => this.setState({ confirmpassword:confirmpassword.target.value })} value={this.state.confirmpassword} />
                </div>
                <div className="form-group text-center">
                  <label>Nickname:</label>
                  <input type="text" className="form-control modal-text" onChange={nick => this.setState({ nick:nick.target.value })} value={this.state.nick} />
                </div>
                <div className="form-group text-center">
                  <label>Profile Adress:</label>
                  <input type="text" className="form-control modal-text" onChange={profileAdress => this.setState({ profileAdress:profileAdress.target.value })} value={this.state.profileAdress} />
                </div>
                </div>
              : null
              }
              
              <a href="#" onClick={() => this.setState({registerActive: true, modalTitle: 'Sign Up'})}>Sing Up</a>{(this.props.createPartyActivity) ? <a><i> or </i> <a href="#" onClick={this.continueAnonymously.bind(this)}>Continue Anonymously</a></a> : null}
              <button className="btn pull-right modal-save" onClick={(this.state.registerActive) ? this.signUpValidate.bind(this) : this.logInValidate.bind(this)} type="button">{this.state.modalTitle}</button>
            </form>
          </div>
          </ReactModal>
    	);
  	}
}

export default LogInModal;