import React, { Component } from 'react';
import img from './img/iconfinder-icon.svg';

class Header extends Component {

//function for hiding side menu
  hideNav = () => {
    const nav = document.querySelector("nav");
    nav.classList.toggle("hidden");
  }

  render() {
    return (
      <header>
      	<div className="menu-icon" onClick={this.hideNav}>
        <img src={img} alt="menu" />
      	</div>
        <h1>Map App</h1>
      </header>
    );
  }
}

export default Header;