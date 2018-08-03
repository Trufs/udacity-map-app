import React, { Component } from 'react';
//what's supposed to happen with the filtered locations?
class Filter extends Component {
	updateQuery(){};

  render() {
    return (
      <div className="filter">
      <label htmlFor="filter">Search for locations </label>
      	<input id="filter"
	      	type="text"
					placeholder="Location..."
					// value = {this.props.query}
					onChange = {this.updateQuery}
				/>
      </div>
    );
  }
}

export default Filter;