import React, { Component } from 'react';

class Map extends Component {
	state = {
	      mapIsReady: false,
	    };

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
      // Display the map
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 12,
        mapTypeId: 'roadmap',
      });
              var tribeca = {lat: -34.397, lng: 150.644};
        var marker = new window.google.maps.Marker({
          position: tribeca,
          map: this.map,
          title: 'First Marker!'
        });
    }
  }

  render() {
    return (
    	<div>
	      <div id="map"></div>
      </div>
    );
  }
}

export default Map;