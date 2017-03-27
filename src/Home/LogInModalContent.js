import React, { Component } from 'react';
import './Home.css';
import { Link } from 'react-router';
import ReactModal from 'react-modal'; 
import config from '../config'


class LogInModalContent extends Component {
  constructor() {
      super();
      this.state = {
        email: '',
        password: ''
      };
  }

  componentWillMount(){
    this.setState({
          email: '', 
          password: ''
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
      if(this.props.createPartyActivity === true){
        this.props.router.push({
            pathname: '/organizer'
        });
      }
      else{
        this.props.checkLogInActive();
      }
    });
  }



  render() {
    return (
      <div>
        <div className="modal-header text-center">
          <h4 className="modal-title" id="myModalLabel">Zaloguj Sie</h4>
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
            <a href="#" onClick={this.props.changeRegisterFormActivity}>Zarejestruj Sie</a>
            <button className="btn pull-right modal-save" onClick={this.logInValidate.bind(this)} type="button">Zaloguj Sie</button>
          </form>
        </div>
      </div>
    );
  }
}

export default LogInModalContent;