import React, { Component } from 'react';
import Filter from './Filter.js';
import Locations from './Locations.js';

class Side extends Component {
  render() {
    return (
      <div>
        <Filter />
        <Locations />
      </div>
    );
  }
}

export default Side;