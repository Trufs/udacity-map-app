import React, { Component } from 'react';

class Map extends Component {
	state = {
	      mapScriptLoaded: false,
        mapDisplayed: false,
        markersArray: [],
        infowindowsArray: []
	    };

//idea from https://stackoverflow.com/a/51437173
componentDidMount() {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.defer = true;
    mapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDGkQx8UGmIKa8CxCfQv-1pgoIvhw9Nkvs';
    mapScript.addEventListener('load', () => {
      this.setState({ mapScriptLoaded: true });
    });
    console.log('appending script');
    document.body.appendChild(mapScript);
  }

  componentDidUpdate() {
    const markersArray = [];
    const infowindowsArray = [];
  //if the script is ready, create map
    if (this.state.mapScriptLoaded) {

      if (this.state.mapDisplayed === false){ //make sure map only loads once
        console.log('entering if')

        this.map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 49.198333, lng: 19.71194419},
          zoom: 10,
          mapTypeId: 'terrain',
        });
        //create initial markers & infowindows
        this.props.places.map((place) => {
        var marker = new window.google.maps.Marker({
          position: {lat: place.lat, lng: place.lng},
          map: this.map,
          title: place.name,
          animation: window.google.maps.Animation.DROP,
          visible: true
        });
        markersArray.push(marker)
        var infowindow = new window.google.maps.InfoWindow({
          content: `<div>${place.name}</div>
                    <div>${place.weather.currently.summary}</div>
                    <div>Precipitation Probability: ${place.weather.currently.precipProbability*100}%</div>
                    <div>Temperature: ${place.weather.currently.temperature} ˚C</div>
                    <div>Apparent Temperature: ${place.weather.currently.apparentTemperature} ˚C</div>
                    <div>Wind Speed: ${place.weather.currently.windSpeed} km/h</div>
          `
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
        })

      this.setState({mapDisplayed:true});
      this.setState({markersArray: markersArray});
      this.setState({infowindowsArray: infowindowsArray});

    }
      //hide the markers that have no corresponding place

      this.state.markersArray.map((marker) => {
          marker.visible = false;
          this.props.places.map((place) => {
          if(marker.title === place.name) {
            marker.visible=true;

          }
        })
        if(marker.visible === false){
          marker.setMap(null)
        }else if(marker.map===null){
          marker.setMap(this.map);
        }

      })
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