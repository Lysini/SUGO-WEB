import React, { Component } from 'react';
import { Link } from 'react-router';
import './User.css';
import Navbar from '../Home/Navbar';
import config from '../config';

class EventInfoPeople extends Component {
  constructor() {
      super();
      this.state = {
        
      };
  }


  componentWillMount(){
      this.setState({
          peopleMen: this.props.people.peopleMen,
          peopleWomen: this.props.people.peopleWomen
          
      });
  }

  render(){
    return(
    	<div>
        	<div className="col-sm-4 text-center">
           		<div className="people-men-box">
                    <h1>Mężczyźni:</h1>
                    <div className="people-men-list">
                        <div className="jumbotron text-center">
                            {this.state.peopleMen.map((peopleItem, peopleIndex) => {
                                return (
                                    <div className="page-header">
                                        <p>Imie: {peopleItem.peopleName}</p>
                                        <p>Notka: {peopleItem.peopleNote}</p>
                                    </div> 
                                  	);
                                })
                            }
                        </div>
                    </div>  
                </div> 
            </div> 
            <div className="col-sm-4 text-center">
                <div className="people-women-box">
                    <h1>Kobiety:</h1>
                    <div className="people-women-list">
                        {this.state.peopleWomen.map((peopleItem, peopleIndex) => {
                            return (
                                <div className="page-header">
                                    <p>Imie: {peopleItem.peopleName}</p>
                                    <p>notka: {peopleItem.peopleNote}</p>
                                </div> 
                                );
                            })
                        }
                    </div>
                </div>
            </div>  
        </div>
    );
  }
}

export default EventInfoPeople;