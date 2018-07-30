import React, { Component } from 'react';
import Place from './Place.js';

//where do locations come from?

class Locations extends Component {
  render() {
    return (
      <div>
      some Locations
		<ol>
			<li>
				<Place />
			</li>
		</ol>
      </div>
    );
  }
}

export default Locations;