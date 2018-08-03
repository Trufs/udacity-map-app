import React, { Component } from 'react';
import './App.css';
import Map from './Map.js';
import Header from './Header.js';
import Side from './Side.js';

const places = [{name: 'Rysy', lat: 49.179548, lng: 20.088064},
			{name: 'Krywan', lat: 49.162545, lng: 19.999916},
			{name: 'Lomnica', lat: 49.195301, lng: 20.213147},
			{name: 'Koscielec', lat: 49.2254, lng: 20.014574},
			{name: 'Bystra', lat: 49.189007, lng: 19.842498},
			{name: 'Banikov', lat: 49.198333, lng: 19.71194419},
			{name: 'Zakopane', lat: 49.299181, lng: 19.949562},
			{name: 'Zuberzec', lat: 49.260516, lng: 19.614379},
			{name: 'Stary Smokovec', lat: 49.139046, lng: 20.220382}
			];

class App extends Component {

componentDidMount() {
	//test call to darksky for weather info
// const proxyurl = "https://cors-anywhere.herokuapp.com/";
// const url = "https://api.darksky.net/forecast/4d9815b80f6cb2b5257e16dd82945f14/49.299181,19.949562?exclude=[minutely,daily]&units=auto"; // site that doesn’t send Access-Control-*
// fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
// .then(response => response.text())
// .then(contents => console.log(contents))
  }


  render() {
    return (
      <React.Fragment>
        <Header />
          <Side places={places} />
          <Map places={places} />
      </React.Fragment>
    );
  }
}

export default App;
