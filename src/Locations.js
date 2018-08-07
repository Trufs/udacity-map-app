import React, { Component } from 'react';
import Place from './Place.js';



class Locations extends Component {
  constructor(props) {
    super(props);
    this.showAll = this.showAll.bind(this);
  }

  showAll(e) {
    this.props.onshowAll(e.target);
  }


  render() {
    return (
    <div className="locations">
      <p> Peaks & Towns </p>
			<ul>
      {this.props.places.map((place) => (
        <li key={place.name}>
          <Place
          place = {place}
          chosenPlace = {this.props.chosenPlace}
          onupdateChosenPlace = {this.props.onupdateChosenPlace}
          />
        </li>)
      )}
      <li className="show-all" onClick={this.showAll}>
        <i className="fas fa-angle-double-down"></i>  Show All
      </li>
			</ul>
    </div>
    );
  }
}

export default Locations;