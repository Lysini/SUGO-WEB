import React, { Component } from 'react';
import { Link } from 'react-router';
import './User.css';
import Navbar from '../Home/Navbar';
import config from '../config';

class EventInfoStuff extends Component {
  constructor() {
      super();
      this.state = {
      };
  }


  componentWillMount(){
      this.setState({
          stuff: this.props.stuff
      });
  }

  render(){
    return(
      	<div className="row">
            {this.state.stuff.map((stuffItem, stuffIndex) => {
                return (
                    <div className="col-sm-4 pull-left text-center">
                        <p className="stuff-label">Nazwa stuffu: {stuffItem.labelName}</p>
                        <div className="stuff-label-content">
                        	{stuffItem.stuffArray.map((stuffArrayItem, stuffArrayIndex) => {
                            	return (
                                	<div>
                                    	<p>Nazwa przedmiotu: {stuffArrayItem.stuffName}</p>
                                    	<p>Nazwa cena: {stuffArrayItem.stuffPrice}</p>
                                    	<p>Nazwa ilość: {stuffArrayItem.stuffAmount}</p>
                                	</div>  
                                	);
                            	})
                        	}
                    	</div>
                    </div>  
                    );
                })
            }
        </div>
    );
  }
}

export default EventInfoStuff;