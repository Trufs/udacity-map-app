import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
      	<div className="menu-icon">
        	<i className="fas fa-bars fa-2x"></i>
      	</div>
        <h1>Map App</h1>
      </header>
    );
  }
}

export default Header;