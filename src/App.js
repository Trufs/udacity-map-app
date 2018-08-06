import React, { Component } from 'react';
import './App.css';
import Map from './Map.js';
import Header from './Header.js';
import Side from './Side.js';

const places = [
			{name: 'Rysy', lat: 49.179548, lng: 20.088064},
			{name: 'Krywan', lat: 49.162545, lng: 19.999916}
			// {name: 'Lomnica', lat: 49.195301, lng: 20.213147},
			// {name: 'Koscielec', lat: 49.2254, lng: 20.014574},
			// {name: 'Bystra', lat: 49.189007, lng: 19.842498},
			// {name: 'Banikov', lat: 49.198333, lng: 19.71194419},
			// {name: 'Zakopane', lat: 49.299181, lng: 19.949562},
			// {name: 'Zuberzec', lat: 49.260516, lng: 19.614379},
			// {name: 'Stary Smokovec', lat: 49.139046, lng: 20.220382}
			];

let placesToShow = places;
let nbReady = 0;

class App extends Component {
	state = {
		query: '',
		chosenPlace: '',
		ready: 0
	}

	updateQuery = (query) => {
		this.setState({query: query});
		const match = new RegExp(query, 'i');
		placesToShow = places.filter((place) => match.test(place.name));
		console.log(placesToShow);
	}

	updateChosenPlace = (chosenPlace) => {
		this.setState({chosenPlace: chosenPlace});
		console.log("Hello! it's chosen place.");
		console.log(chosenPlace);  //chosen place's marker should bounce or sth and open the info window
		placesToShow = places.filter((place) => place.name === chosenPlace);
	}

componentDidMount() {
	//call to darksky for weather info
	const proxyurl = "https://cors-anywhere.herokuapp.com/";
	places.map((place) => (
		fetch(proxyurl + `https://api.darksky.net/forecast/4d9815b80f6cb2b5257e16dd82945f14/${place.lat},${place.lng}?exclude=[minutely, hourly, daily&units=auto`) // https://cors-anywhere.herokuapp.com/https://example.com
		.then(response => response.json())
		.then(contents => {
			place.weather = contents;
			console.log(place.weather);
			nbReady += 1;
			this.setState({ready: nbReady});
			console.log(this.state.ready)
		})
	))
  }


  render() {
    return (
      <React.Fragment>
        <Header />
          <Side
	          places={placesToShow}
	          query={this.state.query}
	          onupdateQuery={this.updateQuery}
	          chosenPlace = {this.state.chosenPlace}
	          onupdateChosenPlace = {this.updateChosenPlace}
           />

           {this.state.ready===places.length &&
          <Map
	          places={placesToShow}
	          chosenPlace={this.state.chosenPlace}
          />
      }
      </React.Fragment>
    );
  }
}

export default App;
