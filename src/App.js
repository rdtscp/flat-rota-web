import React, { Component } from 'react';

import LandingPage from './Views/LoadingPage';
import LoginPage from './Views/LoginPage';
import HomePage from './Views/HomePage';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authenticated: false,
      token: null
    };
  }

  componentDidMount = () => {
    var token = localStorage.getItem('token');

    /* Simulate a Network Request Checking Authenticity */
    setTimeout(() => {
      let authenticated = Math.floor(Math.random() * 1);
      this.setState({
        loading: false,
        authenticated: authenticated,
        token: token
      })
    }, 2000);
  }

  render = () => {
    if (this.state.loading) {
      return(<LandingPage/>);
    }
    else if (this.state.authenticated) {
      return (<HomePage/>);
    }
    else {
      return (<LoginPage/>);
    }
  } 

}

export default App;