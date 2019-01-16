import React from 'react';
import { Input } from 'semantic-ui-react';

import { inject, observer } from 'mobx-react';

@inject('informationStore')
@observer
class SearchField extends React.Component {
  render() {
    return (
      <Input
        icon={{
          name: 'search',
          circular: true,
          link: true,
          onClick: this.handleSearchSubmit.bind(this)
        }}
        placeholder="Search..."
        onChange={this.handleChange.bind(this)}
      />
    );
  }

  handleChange(e) {
    this.setState({
      licensePlate: e.target.value
    });
  }

  handleSearchSubmit(e) {
    this.props.informationStore.fetchVehicleDetails(this.state.licensePlate);
  }
}

export default SearchField;
