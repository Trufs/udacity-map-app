import React, { Component } from 'react';

class Place extends Component {
  constructor(props) {
    super(props);
    this.updateChosenPlace = this.updateChosenPlace.bind(this);
  }

  updateChosenPlace(e) {
  	console.log(e.target.textContent);
    this.props.onupdateChosenPlace(e.target.textContent);
  }

  render() {
    return (
      <div onClick={this.updateChosenPlace}>
      	<p>{`${this.props.place.name}`}</p>
      </div>
    );
  }
}

export default Place;