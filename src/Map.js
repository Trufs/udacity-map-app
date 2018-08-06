import React, { Component } from 'react';


class Map extends Component {
	state = {
	      mapIsReady: false,
	    };

//https://stackoverflow.com/a/51437173
componentDidMount() {
		//this probably can be done with fetch, no? or a normal promise?

		//----
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
        zoom: 10,
        mapTypeId: 'terrain',
      });
      const markersArray = [];
      const infowindowsArray = [];
      this.props.places.map((place) => {
        var marker = new window.google.maps.Marker({
          position: {lat: place.lat, lng: place.lng},
          map: this.map,
          title: place.name,
          animation: window.google.maps.Animation.DROP,
        });
        markersArray.push(marker);
        var infowindow = new window.google.maps.InfoWindow({
          content: place.name
        });

        marker.addListener('click', function() {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            markersArray.map((marker) => marker.setAnimation(null)) //clear bouncing of other markers
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
          }

            infowindowsArray.map((infowindow) => infowindow.close());
            infowindow.open(this.map, marker);
            infowindowsArray.push(infowindow);


        });

      })//and of places.map loop
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