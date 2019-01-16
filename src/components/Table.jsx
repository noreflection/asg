import React from 'react';
import { Table } from 'semantic-ui-react';

import { inject, observer } from 'mobx-react';

@inject('informationStore')
@observer
class InformationalTable extends React.Component {
  render() {
    const store = this.props.informationStore;

    return (
      <Table striped>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <b>License Plate</b>
            </Table.Cell>
            <Table.Cell>{store.licensePlate}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <b>Merk</b>
            </Table.Cell>
            <Table.Cell>{store.brand}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <b>Handelsbenaming</b>
            </Table.Cell>
            <Table.Cell>{store.commercialName}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <b>Voertuigsoort</b>
            </Table.Cell>
            <Table.Cell>{store.type}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <b>Eerste Kleur</b>
            </Table.Cell>
            <Table.Cell>{store.color}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <b>Aantal Zitplaatsen</b>
            </Table.Cell>
            <Table.Cell>{store.numberOfSeats}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <b>Catalogusprijs</b>
            </Table.Cell>
            <Table.Cell>{store.catalogPrice}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

export default InformationalTable;
