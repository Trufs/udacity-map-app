import React, { Component } from 'react';
import Place from './Place.js';

//where do locations come from?

class Locations extends Component {
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

			</ul>
    </div>
    );
  }
}

export default Locations;