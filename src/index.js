import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import LoginForm from './components/LoginForm';

import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';

import InformationStore from './stores/InformationStore';

import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <Router>
    <Provider informationStore={new InformationStore()}>
      <div>
        <Route exact path="/" component={App} />

        <Route exact path="/login" component={LoginForm} />
      </div>
    </Provider>
  </Router>,
  document.getElementById('root')
);
