// FilterComponent.js
import React, { Component } from 'react';

class FilterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      process: true,
      done: true,
      closed: true,
    };
  }

  handleCheckboxChange = (status) => {
    this.setState((prevState) => ({
      [status]: !prevState[status],
    }));
  };

  render() {
    const { open, process, done, closed } = this.state;

    return (
      <div className="filter-component">
        <label style={{display: 'block'}}>
          <input
            type="checkbox"
            checked={open}
            onChange={() => this.handleCheckboxChange('open')}
          />
         open
        </label>

        <label style={{display: 'block'}}>
          <input
            type="checkbox"
            checked={process}
            onChange={() => this.handleCheckboxChange('process')}
          />
          proses
        </label>
        <label style={{display: 'block'}}>
          <input
            type="checkbox"
            checked={done}
            onChange={() => this.handleCheckboxChange('done')}
          />
         done
        </label>
        <label style={{display: 'block'}}>
          <input
            type="checkbox"
            checked={closed}
            onChange={() => this.handleCheckboxChange('closed')}
          />
          closed
        </label>

        {/* Tambahkan checkbox untuk status lainnya */}
      </div>
    );
  }
}

export default FilterComponent;
