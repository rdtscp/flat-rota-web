import React, { Component } from 'react';

import Landing from './Views/Landing';
import Login from './Views/Login';

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
    }, 1000);
  }

  render = () => {
    if (this.state.loading) {
      return(<Landing/>);
    }
    else if (this.state.authenticated) {
      return (<Home/>);
    }
    else {
      return (<Login/>);
    }
  } 

}

export default App;