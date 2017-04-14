import React, { Component } from 'react';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import './Home.css';


class AccountDropdown extends Component {


  logOut(){
    this.props.logOut();
  }

  componentWillMount(){
      this.setState({name: localStorage.getItem("name")});
  }

  /*handleLinkClick() {
    this.refs.dropdown.hide();
  }*/


  render() {
    return (
      <Dropdown className="dropdown" ref="dropdown">
        <DropdownTrigger className="btn btn-primary dropdown-toggle">{this.state.name} <span className="caret"></span>
        </DropdownTrigger>
        <DropdownContent className="dropdown-menu">
          <ul className="account-dropdown__quick-links account-dropdown__segment">
            <li className="account-dropdown__link">
              <a className="account-dropdown__link__anchor" href="user" onClick={this.handleLinkClick}>
                My Account
              </a>
            </li>
            <li className="account-dropdown__link">
              <a className="account-dropdown__link__anchor" href="user/events" onClick={this.handleLinkClick}>
                My Events
              </a>
            </li>
          </ul>
          <ul className="account-dropdown__management-links account-dropdown__segment">
            <li className="account-dropdown__link">
              <a className="account-dropdown__link__anchor" href="#" onClick={this.handleLinkClick}>
                Settings
              </a>
            </li>
            <li className="account-dropdown__link">
              <a className="account-dropdown__link__anchor"  onClick={this.logOut.bind(this)}>
                Log Out
              </a>
            </li>
          </ul>
        </DropdownContent>
      </Dropdown>
    );
  }
};

export default AccountDropdown;