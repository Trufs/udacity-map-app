import React, { Component } from 'react';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.updateQuery = this.updateQuery.bind(this);
  }

  updateQuery(e) {
    this.props.onupdateQuery(e.target.value);
  }

  render() {
    return (
      <div className="filter">
      <label htmlFor="filter">Search for locations </label>
      	<input id="filter"
	      	type="text"
					placeholder="Location..."
					value = {this.props.query}
					onChange = {this.updateQuery}
				/>
      </div>
    );
  }
}

export default Filter;