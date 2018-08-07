import React, { Component } from 'react';
import Filter from './Filter.js';
import Locations from './Locations.js';
import img from './img/poweredby-darkbackground.png'

class Side extends Component {
	state = {
		query: ''
	}

	updateQuery = (query) => {
		this.setState({query: query});
		console.log("it's side.js, I've got your query bae");
		console.log(query);

	}

  render() {
	const match = new RegExp(this.state.query, 'i');
  	let placesToShow = this.props.places.filter((place) => match.test(place.name));
  	console.log(placesToShow);

    return (

      <nav>
        <Filter
	        query = {this.props.query}
	        onupdateQuery={this.props.onupdateQuery}
        />

        <Locations
	        places = {placesToShow}
			chosenPlace = {this.props.chosenPlace}
			onupdateChosenPlace = {this.props.onupdateChosenPlace}
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