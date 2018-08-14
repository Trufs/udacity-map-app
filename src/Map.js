import React, { Component } from 'react';

const infowindowsArray = [];

class Map extends Component {
  constructor(props) {
  super(props);
  this.state = {
      mapScriptLoaded: false,
      mapDisplayed: false,
      markersArray: [],
      infowindowsArray: [],
      ready: 0
    };
  }

//create infowindows
createInfowindows = (marker, place) => {
  const infowindow = new window.google.maps.InfoWindow({
    content: `<h4>${marker.title}</h4><div>Sorry, the weather data is currently unavailable.</div>`,
    name: marker.title
    });

  if(place.weather){
    const weatherInfo = `<div>${place.weather.currently.summary}</div>
    <div>Temperature: ${place.weather.currently.temperature} ˚C</div>
    <div>Wind Speed: ${place.weather.currently.windSpeed} km/h</div>`;
    infowindow.setContent(`<h4>${marker.title}</h4><div>${weatherInfo}</div>`);
  }

  infowindowsArray.push(infowindow); //add infowindow to infowindows array
  infowindow.open(this.map, marker); //open only the infowindow of the chosen marker
  this.setState({infowindowsArray: infowindowsArray}); //set infowindowsArray as a state
}

//create divs with info for screenreaders
createInfoWeather = (place) => {
  const infoWeather = document.querySelector(".weatherInfo");
  infoWeather.innerHTML=`<h4>${place.name}</h4><div>Sorry, the weather data is currently unavailable.</div>`;
  if(place.weather){
    const weatherInfo = `<div>${place.weather.currently.summary}</div>
    <div>Temperature: ${place.weather.currently.temperature} ˚C</div>
    <div>Wind Speed: ${place.weather.currently.windSpeed} km/h</div>`;
    infoWeather.innerHTML=`<h4>${place.name}</h4><div>${weatherInfo}</div>`;
  }
  document.querySelector(".weatherInfo").focus();
}

//change displayed places when user choses some of them (either by filter or clicking one)
  manageMarkersChoice = () => {
    //get the map back to center
    this.map.panTo({lat: 49.198333, lng: 19.842498});
    //hide the infowindows
    this.state.infowindowsArray.map((infowindow) => {
      infowindow.close();
    });
    this.state.markersArray.map((marker) => {
      //stop the bouncing
      marker.setAnimation(null);
      //mark all markers as not visible
      marker.visible = false;
      //go through the list of places and change the markers that should be displayed to visible
      this.props.places.map((place) => {
        if(marker.title===place.name){ marker.visible=true; }
      })
      //hide those marked for hiding & make sure those marked for showing are visible
      if(marker.visible === false){
        marker.setMap(null);
      }else if(marker.map===null){
        marker.setMap(this.map);
      }
    })//end of markersArray.map

    //in a special case that a place is chosen, display corresponding infowindow
    if(this.props.places.length===1 && this.props.chosenPlace){
      this.state.markersArray.map((marker) => {
        if(marker.title === this.props.places[0].name){
          this.map.panTo(marker.getPosition());
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          this.createInfowindows(marker, this.props.places[0]);
          this.createInfoWeather(this.props.places[0]);
        }
      })
    }
  } //end of manageMarkersChoice function


  componentDidMount() {
  //idea for map loading from https://stackoverflow.com/a/51437173
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.defer = true;
    mapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDGkQx8UGmIKa8CxCfQv-1pgoIvhw9Nkvs';
    mapScript.addEventListener('load', () => {
      this.setState({ mapScriptLoaded: true });
    });
    console.log('appending script');
    document.body.appendChild(mapScript);

   if(this.state.mapScriptLoaded === false){
      var warning = document.querySelector('.warning');
      warning.classList.remove("hidden-for-everyone");
    }

    //call to darksky for weather info
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    this.props.places.map((place) => (
      fetch(proxyurl + `https://api.darksky.net/forecast/4d9815b80f6cb2b5257e16dd82945f14/${place.lat},${place.lng}?exclude=[minutely, hourly, daily&units=ca`) // https://cors-anywhere.herokuapp.com/https://example.com
      .then(response => response.json())
      .then(contents => {
        place.weather = contents;
        this.setState({ready: this.state.ready + 1});
      })
      .catch(error => {
        console.log('Weather data cannot be fetched')
        console.log(error);
      })
    ))
  }

  componentDidUpdate(prevProps) {
    const markersArray = [];
    //if the script is ready & map is not displayed yet, create map
    if (this.state.mapScriptLoaded && this.state.mapDisplayed === false ) {
      //display map
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 49.198333, lng: 19.842498},
        zoom: 10,
        mapTypeId: 'terrain',
      });

      //create markers
      this.props.places.map((place) => {
        //create a marker for each place
        const marker = new window.google.maps.Marker({
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

    //if the map loaded, hide the warning
    if(this.state.mapDisplayed){
      const warning = document.querySelector('.warning');
      warning.classList.add("hidden-for-everyone");
    }

    //when map is already loaded, but some markers are chosen, react accordingly
    if(this.state.mapDisplayed && this.props !== prevProps){
      this.manageMarkersChoice();
    }
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