import React, { Component } from 'react';
import { Link } from 'react-router';
import Navbar from './Navbar';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="main-bg">
          <Navbar />
          <div className="main-slogan">
            <div>
              <p className="main-slogan-text">Spotkaj się ze znajomymi!</p>
              <p className="main-slogan-text">Uniknij problemów z organizacją</p>
              <Link to={`create`}><button className="btn main-slogan-btn">Stwórz wydarzenie!</button></Link>
            </div>
          </div>
          <p className="Home-intro">
            To get started, edit <code>src/Home.js</code> and save to reload.
          </p>
          <h1 className="Home-main-title">
            Jak ja jutro tutaj jakiegoś sztosa robieeeeeeeeee!
          </h1>
      </div>
      </div>
    );
  }
}

export default Home;
