import React from 'react';
import { Message } from 'semantic-ui-react';

class InformationalMessage extends React.Component {
  render() {
    return (
      <Message>
        <Message.Header>Success</Message.Header>

        <p>Information has been successfully send!</p>
      </Message>
    );
  }
}

export default InformationalMessage;
