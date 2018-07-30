import React, { Component } from 'react';
import './App.css';
import Map from './Map.js';
import Nav from './Nav.js';
import Side from './Side.js';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Nav />
        <Side />
        <Map />
      </div>
    );
  }
}

export default App;
