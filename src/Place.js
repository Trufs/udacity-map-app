import React, { Component } from 'react';

class Place extends Component {
  render() {
    return (
      <div>
      	<p>{`${this.props.place.name}`}</p>
      </div>
    );
  }
}

export default Place;