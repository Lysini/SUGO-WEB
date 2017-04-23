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

  openUserEvents(){
    this.props.router.push({ pathname: '/user/events' });
  }

  openUserInfo(){
    this.props.router.push({ pathname: '/user' });
  }

  render() {
    return (
      <Dropdown className="dropdown" ref="dropdown">
        <DropdownTrigger className="btn btn-primary dropdown-toggle">{this.state.name} <span className="caret"></span>
        </DropdownTrigger>
        <DropdownContent className="dropdown-menu">
          <ul className="account-dropdown__quick-links account-dropdown__segment">
            <li className="account-dropdown__link">
              <a href="#" className="account-dropdown__link__anchor" onClick={this.openUserInfo.bind(this)}>
                Mój Profil
              </a>
            </li>
            <li className="account-dropdown__link">
              <a href="#" className="account-dropdown__link__anchor" onClick={this.openUserEvents.bind(this)}>
                Moje Wydarzenia
              </a>
            </li>
          </ul>
          <ul className="account-dropdown__management-links account-dropdown__segment">
            <li className="account-dropdown__link">
              <a className="account-dropdown__link__anchor" href="#" onClick={this.logOut.bind(this)}>
                Wyloguj się
              </a>
            </li>
          </ul>
        </DropdownContent>
      </Dropdown>
    );
  }
};

export default AccountDropdown;