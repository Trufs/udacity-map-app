import React, { Component } from 'react';

class Map extends Component {
	state = {
	      mapScriptLoaded: false,
        mapDisplayed: false,
        markersArray: [],
        infowindowsArray: [],
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

  componentDidUpdate(prevProps) {
    const markersArray = [];
    const infowindowsArray = [];
    //if the script is ready & map is not displayed yet, create map
    if (this.state.mapScriptLoaded && this.state.mapDisplayed === false) {

      //display map
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 49.198333, lng: 19.842498},
        zoom: 10,
        mapTypeId: 'terrain',
      });

      //create initial markers & infowindows
      this.props.places.map((place) => {
        //create a marker for each place
        var marker = new window.google.maps.Marker({
          position: {lat: place.lat, lng: place.lng},
          map: this.map,
          title: place.name,
          animation: window.google.maps.Animation.DROP,
          visible: true
        });

        markersArray.push(marker); //add marker to the marker array

        //create infowindow for each place
        var infowindow = new window.google.maps.InfoWindow({
          content: `<div>${place.name}</div>
                    <div>${place.weather.currently.summary}</div>
                    <div>Precipitation Probability: ${place.weather.currently.precipProbability*100}%</div>
                    <div>Temperature: ${place.weather.currently.temperature} ˚C</div>
                    <div>Apparent Temperature: ${place.weather.currently.apparentTemperature} ˚C</div>
                    <div>Wind Speed: ${place.weather.currently.windSpeed} km/h</div>`,
          name: place.name
        });
        infowindowsArray.push(infowindow); //add infowindow to infowindows array

        //set behavior for markers when they're clicked
        marker.addListener('click', function() {
            markersArray.map((marker) => marker.setAnimation(null)) //clear bouncing of all markers
            marker.setAnimation(window.google.maps.Animation.BOUNCE); //make the chosen marker bounce
            infowindowsArray.map((infowindow) => infowindow.close()); //close all infowindows
            infowindow.open(this.map, marker); //open only the infowindow of the chosen marker
            this.map.panTo(marker.getPosition());
        }); //end of event listener for marker

      }); //end of this.props.places.map

      //close infowindow and stop bouncing when user clicks on the map
      window.google.maps.event.addListener(this.map, "click", function(){
        markersArray.map((marker) => marker.setAnimation(null));
        infowindowsArray.map((infowindow) => infowindow.close());
      });

      //change states
      this.setState({mapDisplayed:true}); //map is displayed now
      this.setState({markersArray: markersArray}); //set markersArray as a state
      this.setState({infowindowsArray: infowindowsArray}); //set infowindowsArray as a state
    } //end of the first 'if' statement

    //when map is already loaded, but the component changes, react accordingly
    if(this.props !== prevProps){
      //get the map back to center
      this.map.panTo({lat: 49.198333, lng: 19.842498});
      //if the list of places changed, hide the markers that have no corresponding place anymore
      this.state.infowindowsArray.map((infowindow) => {
        console.log('runnin')
        infowindow.close();
      });

      this.state.markersArray.map((marker) => {
          //set all markers as not visible
          marker.visible = false;
          //stop the bouncing
          marker.setAnimation(null);
          //go through the list of places and change the markers that should be displayed to visible
          this.props.places.map((place) => {
            if(marker.title === place.name) {
              marker.visible=true;
            }
          })
        if(marker.visible === false){
          marker.setMap(null);  //hide those marked for hiding
        }else if(marker.map===null){
          marker.setMap(this.map); //make sure those marked for showing are visible
        }
      })

      //in a special case that just one place is showing, display corresponding infowindow
      if(this.props.places.length === 1){
        this.state.markersArray.map((marker) => {
          if(marker.title === this.props.places[0].name){
            this.map.panTo(marker.getPosition());
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
            const oneWindow = this.state.infowindowsArray.filter((infowindow) => (infowindow.name === marker.title));
            oneWindow[0].open(this.map, marker);
          }
        })
      }

    } //end of the second 'if' statement

}//end of componentDidUpdate

  render() {
    return (
      <div className="container">
	      <div id="map"></div>
      </div>
    );
  }
}

export default Map;