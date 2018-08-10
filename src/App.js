import React, { Component } from 'react';
import './App.css';
import Map from './Map.js';
import Header from './Header.js';
import Side from './Side.js';


const places = [
			{name: 'Banikov', lat: 49.198333, lng: 19.71194419},
			{name: 'Bystra', lat: 49.189007, lng: 19.842498},
			{name: 'Koscielec', lat: 49.2254, lng: 20.014574},
			{name: 'Krywan', lat: 49.162545, lng: 19.999916},
			{name: 'Lomnica', lat: 49.195301, lng: 20.213147},
			{name: 'Rysy', lat: 49.179548, lng: 20.088064},
			{name: 'Stary Smokovec', lat: 49.139046, lng: 20.220382},
			{name: 'Zakopane', lat: 49.299181, lng: 19.949562},
			{name: 'Zuberzec', lat: 49.260516, lng: 19.614379}
			];

let placesToShow = places;

class App extends Component {
	state = {
		query: '',
		chosenPlace: '',
	}

	updateQuery = (query) => {
		this.setState({query: query});
		this.setState({chosenPlace: ''});
		const match = new RegExp(query, 'i');
		placesToShow = places.filter((place) => match.test(place.name));
		console.log(placesToShow);
	}

	updateChosenPlace = (chosenPlace) => {
		this.setState({chosenPlace: places.filter((place) => place.name === chosenPlace)});
		console.log(this.state.chosenPlace)
	}

	showAll = () => {
		let chosenElement = document.querySelector(".chosen");
		chosenElement && chosenElement.classList.toggle("chosen");
		placesToShow = places;
		this.setState({query: ''});
		this.setState({chosenPlace: ''});
	}

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="warning hidden-for-everyone">Sorry! The map is not available at the moment.</div>
      <Side
          places={placesToShow}
          query={this.state.query}
          onupdateQuery={this.updateQuery}
          chosenPlace = {this.state.chosenPlace}
          onupdateChosenPlace = {this.updateChosenPlace}
          onshowAll = {this.showAll}
       />
        <Map
          places={this.state.chosenPlace || placesToShow}
          chosenPlace = {this.state.chosenPlace}
        />

      </React.Fragment>
    );
  }
}

export default App;
