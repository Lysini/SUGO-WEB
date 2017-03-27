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

  updateEventStuff() {
    var eventId = this.props.params.id;
      fetch(`${config.apiUrl}/event/${eventId}/update/stuff`,{
          headers: {
            'Accept': 'application/json',
             'Content-Type': 'application/json'
          },
          method: 'PUT',
          body: JSON.stringify({
              stuff: this.state.stuff
          })
        })
        .then(
            response => {
                  const status = response.status;
                  if (status === 200) {
                    return response.json();
                  }
        })
        .then(responseData =>{
            this.setState({editMode: false});
            this.props.reFetchEvent;
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