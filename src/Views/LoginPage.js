import React, { Component } from 'react';
import { Button, InputField } from '../Components';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null
    };
  }


  usernameChange = (newUsername) => {
    this.setState({username: newUsername.target.value});
  }

  passwordChange = (newPassword) => {
    this.setState({password: newPassword.target.value});
  }

  /* @TODO
   *  Submit POST Request to backend to verify credentials.
   *  Backend returns authToken if credentials match, otherwise returns error.
   */
  login = () => {
    console.log("Logging In...");
    console.log("\tusername: " + this.state.username);
    console.log("\tpassword: " + this.state.password);
    window.location.reload();
  }

  render = () => {
    return (
      <div className="login-page">
        <div className="login-container">
          <InputField title="Username" onEnter={this.login} onChange={this.usernameChange} />
          <br />
          <InputField title="Password" onEnter={this.login} onChange={this.passwordChange} type="password" />
          <br />
          <Button title="Login" onClick={this.login} />
        </div>
      </div>
    );
  }
}

export default Login;
