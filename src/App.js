import React, { Component } from 'react';
import { Link } from 'react-router';
import CreateParty from './CreateParty';
import './App.css';

class App extends Component {
  render() {
    return (
      <CreateParty/>
      /*<div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2><Link to={`create`}>Create Party!</Link></h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h1 className="App-main-title">
          Jak ja jutro tutaj jakiegoś sztosa robieeeeeeeeee!
        </h1>
      </div>*/
    );
  }
}

export default App;
