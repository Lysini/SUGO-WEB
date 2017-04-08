import React, { Component } from 'react';
import './Home.css';
import ReactModal from 'react-modal'; 
import LogInModalContent from './LogInModalContent';
import SignUpModalContent from './SignUpModalContent';


class LogInModal extends Component {
	constructor() {
	    super();
	    this.state = {
        registerActive: false
      };
  }

  changeRegisterFormActivity(){
    this.setState({registerActive: !this.state.registerActive});
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
                  {(this.state.registerActive) ?
                    <SignUpModalContent onClose={this.props.onClose} router={this.props.router} checkLogInActive={this.props.checkLogInActive}  createPartyActivity={this.props.createPartyActivity} changeRegisterFormActivity={this.changeRegisterFormActivity.bind(this)}/>
                  : <LogInModalContent onClose={this.props.onClose} router={this.props.router} checkLogInActive={this.props.checkLogInActive}  createPartyActivity={this.props.createPartyActivity} changeRegisterFormActivity={this.changeRegisterFormActivity.bind(this)}/>
                  }
        </ReactModal>
    	);
  	}
}

export default LogInModal;