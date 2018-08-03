import React, { Component } from 'react';
import Filter from './Filter.js';
import Locations from './Locations.js';
import img from './img/poweredby-darkbackground.png'

class Side extends Component {
  render() {
    return (

      <nav>
        <Filter />
        <Locations places = {this.props.places}/>
        <div className="attribution">
			<a href="https://darksky.net/poweredby/">
				<img src={img} height="38" width="95"/>
			</a>
		</div>
      </nav>


    );
  }
}

export default Side;