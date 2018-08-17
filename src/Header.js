import React, { Component } from 'react';
import img from './img/iconfinder-icon.svg';

class Header extends Component {

//function for hiding side menu
  hideNav = () => {
    const side = document.querySelector(".side");
    side.classList.toggle("hidden");
  }

  render() {
    return (
      <header>
      	<button className="menu-icon" onClick={this.hideNav}>
        <img src={img} alt="menu" />
      	</button>
        <h1>Map App</h1>
      </header>
    );
  }
}

export default Header;