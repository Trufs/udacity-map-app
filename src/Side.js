import React, { Component } from 'react';
import Filter from './Filter.js';
import Locations from './Locations.js';
import img from './img/poweredby-darkbackground.png'

class Side extends Component {

  render() {
    return (
      <nav>
        <Filter
	        query = {this.props.query}
	        onupdateQuery={this.props.onupdateQuery}
        />

        <Locations
	        places = {this.props.places}
					chosenPlace = {this.props.chosenPlace}
					onupdateChosenPlace = {this.props.onupdateChosenPlace}
					onshowAll = {this.props.onshowAll}
        />

        <div className="attribution">
					<a href="https://darksky.net/poweredby/">
						<img src={img} alt="darksky logo" height="38" width="95"/>
					</a>
				</div>
	    </nav>
    );
  }
}

export default Side;