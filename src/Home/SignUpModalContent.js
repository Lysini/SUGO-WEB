import React, { Component } from 'react';
import './Home.css';
import config from '../config'


class SignUpModalContent extends Component {
  constructor() {
      super();
      this.state = {
        email: '',
        nick: '',
        password: '',
        confirmpassword: '',
        profileAdress: ''
      };
  }

  componentWillMount(){
    this.setState({
          email: '', 
          nick: '', 
          password: '', 
          confirmpassword: '', 
          profileAdress: ''
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


  render() {
    return (
      <div>
        <div className="modal-header text-center">
          <h4 className="modal-title" id="myModalLabel">Zarejestruj Sie</h4>
          <span className="fa fa-times" onClick={this.props.onClose} aria-hidden="true"/>
        </div>
        <div className="modal-form-container-log-in">
          <form>
            <div className="form-group text-center">
              <label>Email:</label>
              <input type="text" className="form-control modal-text" onChange={email => this.setState({ email:email.target.value })} value={this.state.email}/>
            </div>
            <div className="form-group text-center">
              <label>Password:</label>
              <input type="password" className="form-control modal-text" onChange={password => this.setState({ password:password.target.value })} value={this.state.password} />
            </div>
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
            <a href="#" className="change-log-register-form" onClick={this.props.changeRegisterFormActivity}>Zaloguj Sie</a>
            <button className="btn pull-right modal-sign-up-btn" onClick={this.signUpValidate.bind(this)} type="button">Zarejestruj Sie</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUpModalContent;