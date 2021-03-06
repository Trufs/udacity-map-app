import React, { Component } from 'react';

class Place extends Component {
  constructor(props) {
    super(props);
    this.updateChosenPlace = this.updateChosenPlace.bind(this);
  }

  updateChosenPlace(e) {
    this.props.onupdateChosenPlace(e.target.textContent);
    const previousElement = document.querySelector(".chosen");
    previousElement && previousElement.classList.toggle("chosen");
    document.getElementById(`${this.props.place.name}`).classList.toggle("chosen");
  }

  render() {
    return (
      <div id={`${this.props.place.name}`} className='' onClick={this.updateChosenPlace}>
      	<button>{`${this.props.place.name}`}</button>
      </div>
    );
  }
}

export default Place;