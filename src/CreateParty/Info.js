import React, { Component } from 'react';
import './style.css';

class Info extends Component {
	constructor() {
	    super();
	    this.state = {
	    	info: ''
	    };
	}

	saveUp() {
		this.props.saveInfo(
	      	this.state.info
	    );
	}

	

  render() {
    return (
		<div className="openedPlace">
      	<div className="PlaceClose" onClick={this.props.onClose}>
     		<div className="close-left"></div>
      		<div className="close-right"></div>
      	</div>
			<div className="container pull-left">
				<div className="form-container">
					<form>
					<div className="form-group">
						<label>Special Info:</label>
						<textarea className="form-control InfoTextArea" onChange={info => this.setState({ info:info.target.value })} value={this.state.info} />
					</div>
					</form>
				</div>	
			<button className="btn InfoSave" onClick={this.saveUp.bind(this)}>Next</button>
     	</div>
     </div>
    );
  }
}

export default Info;