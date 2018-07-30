import React, { Component } from 'react';
//what's supposed to happen with the filtered locations?
class Filter extends Component {
	updateQuery(){};

  render() {
    return (
      <div>
      <label htmlFor="filter">Chosen Location </label>
      	<input id="filter"
	      	type="text"
					placeholder="Search for locations"
					// value = {this.props.query}
					onChange = {this.updateQuery}
				/>
      </div>
    );
  }
}

export default Filter;