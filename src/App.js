import React from 'react';

import { Button } from 'semantic-ui-react';
import SearchField from './components/SearchField';
import Message from './components/Message';
import Table from './components/Table';

import './App.css';

import { inject, observer } from 'mobx-react';

import AuthService from './services/AuthService';
import withAuth from './components/withAuth';

const Auth = new AuthService();

@inject('informationStore')
@observer
class App extends React.Component {
  render() {
    const store = this.props.informationStore;

    return (
      <div className="app">
        <div className="search-field">
          <SearchField />
        </div>

        <div className="table">
          <Table />
        </div>

        {store.imageLink ? (
          <div className="image">
            <img src={store.imageLink} alt="" />
          </div>
        ) : null}

        {store.vehicleInfoFetched ? (
          <div className="update-button">
            <Button type="button" onClick={() => store.searchVehicle()}>
              Send Info On Server
            </Button>
          </div>
        ) : (
          <div className="update-button">
            <Button disabled>Send Info On Server</Button>
          </div>
        )}

        {store.pushedToServer ? (
          <div className="message">
            <Message />
          </div>
        ) : null}

        <div className="logout-button">
          <Button type="button" onClick={this.handleLogout.bind(this)}>
            Logout
          </Button>
        </div>
      </div>
    );
  }

  handleLogout() {
    Auth.logout();
    this.props.history.replace('/login');
  }
}

export default withAuth(App);
