import React from 'react';
import { Button, Form } from 'semantic-ui-react';

import AuthService from '../services/AuthService';

class LoginForm extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.Auth = new AuthService();
  }

  componentDidMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  render() {
    return (
      <div className="login-form">
        <Form>
          <Form.Field>
            <label>User Email</label>
            <input
              placeholder="Email"
              name="email"
              onChange={this.handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label>User Password</label>
            <input
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
            />
          </Form.Field>

          <Button type="submit" onClick={this.handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit() {
    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        this.props.history.replace('/');
      })
      .catch(err => {
        alert(err);
      });
  }
}

export default LoginForm;
