import React, { Component } from 'react';

let nbReady = 0;
const infowindowsArray = [];
class Map extends Component {
    constructor(props) {
    super(props);
    this.state = {
	      mapScriptLoaded: false,
        mapDisplayed: false,
        markersArray: [],
        infowindowsArray: [],
        ready: 0,
        failed: false
	    };
      this.createInfowindows = this.createInfowindows.bind(this);
}

//create infowindows
createInfowindows = (marker, place) => {
  var infowindow = new window.google.maps.InfoWindow({
    content: `<h4>${marker.title}</h4><div>Sorry, the weather data is currently unavailable.</div>`,
    name: marker.title
    });

  if(this.state.ready === this.props.places.length){
    const weatherInfo = `<div>${place.weather.currently.summary}</div>
    <div>Precipitation Probability: ${place.weather.currently.precipProbability*100}%</div>
    <div>Temperature: ${place.weather.currently.temperature} ˚C</div>
    <div>Wind Speed: ${place.weather.currently.windSpeed} km/h</div>`;
    infowindow.setContent(`<h4>${marker.title}</h4><div>${weatherInfo}</div>`);
  }

    infowindowsArray.push(infowindow); //add infowindow to infowindows array
    infowindow.open(this.map, marker); //open only the infowindow of the chosen marker
    this.setState({infowindowsArray: infowindowsArray}); //set infowindowsArray as a state
}



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

  //call to darksky for weather info
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  this.props.places.map((place) => (
    fetch(proxyurl + `https://api.darksky.net/foecast/4d9815b80f6cb2b5257e16dd82945f14/${place.lat},${place.lng}?exclude=[minutely, hourly, daily&units=ca`) // https://cors-anywhere.herokuapp.com/https://example.com
    .then(response => response.json())
    .then(contents => {
      place.weather = contents;
      nbReady += 1;
      this.setState({ready: nbReady});
      console.log(this.state.ready)
    })
    .catch(error => {
      console.log(error);
      this.setState({failed: true});
    })
  ))
  }

  componentDidUpdate(prevProps) {
    const markersArray = [];
    //if the script is ready & map is not displayed yet & weather data is ready, create map && this.state.ready===this.props.places.length
    if (this.state.mapScriptLoaded && this.state.mapDisplayed === false ) {

      //display map
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 49.198333, lng: 19.842498},
        zoom: 10,
        mapTypeId: 'terrain',
      });

      //create initial markers
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

          //set behavior for markers when they're clicked
          marker.addListener('click', () => {
            markersArray.map((marker) => marker.setAnimation(null)) //clear bouncing of all markers
            marker.setAnimation(window.google.maps.Animation.BOUNCE); //make the chosen marker bounce
            this.map.panTo(marker.getPosition()); //center map on the clicked marker
            infowindowsArray && infowindowsArray.map((infowindow) => infowindow.close()); //close all infowindows
            this.createInfowindows(marker, place); //create and open corresponding infowindow
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
    } //end of the first 'if' statement



    //when map is already loaded, but the component changes, react accordingly
    if(this.props !== prevProps){
      //get the map back to center
      this.map.panTo({lat: 49.198333, lng: 19.842498});
      //if the list of places changed, hide the markers that have no corresponding place anymore
      this.state.infowindowsArray.map((infowindow) => {
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
            this.createInfowindows(marker, this.props.place);
            // const oneWindow = this.state.infowindowsArray.filter((infowindow) => (infowindow.name === marker.title));
            // oneWindow[0].open(this.map, marker);
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