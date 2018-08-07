import React, { Component } from 'react';

class Header extends Component {

  hideNav = () => {
    let nav = document.querySelector("nav");
    nav.classList.toggle("hidden");
  }

  render() {
    return (
      <header>
      	<div className="menu-icon" onClick={this.hideNav}>
        	<i className="fas fa-bars fa-2x"></i>
      	</div>
        <h1>Map App</h1>
      </header>
    );
  }
}

export default Header;