import React, { Component } from 'react';

class Map extends Component {
	state = {
	      mapIsReady: false,
	    };

//https://stackoverflow.com/a/51437173
componentDidMount() {
		//this probably can be done with fetch, no? or a normal promise?
    const ApiKey = 'AIzaSyDGkQx8UGmIKa8CxCfQv-1pgoIvhw9Nkvs';
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${ApiKey}`;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => {
      this.setState({ mapIsReady: true });
    });

    document.body.appendChild(script);
  }

  componentDidUpdate() {
    if (this.state.mapIsReady) {
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 49.155698, lng: 20.044299},
        zoom: 12,
        mapTypeId: 'terrain',
      });
    var rysy = {lat: 49.179548, lng: 20.088064};
      var marker = new window.google.maps.Marker({
        position: rysy,
        map: this.map,
        title: 'Rysy'
      });
    }
  }

  render() {
    return (
    	<div className="container">
	      <div id="map"></div>
      </div>
    );
  }
}

export default Map;