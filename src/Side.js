import React, { Component } from 'react';
import Filter from './Filter.js';
import Locations from './Locations.js';

class Side extends Component {
  render() {
    return (
      <nav>
        <Filter />
        <Locations places = {this.props.places}/>
      </nav>
    );
  }
}

export default Side;