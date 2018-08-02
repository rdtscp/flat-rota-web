import React, { Component } from 'react';

import LandingPage from './Views/LoadingPage';
import LoginPage from './Views/LoginPage';
import HomePage from './Views/HomePage';
import network from './Resources/networkHelper';

class App extends Component {

    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        authenticated: false,
        token: null
      };
    }

    /* On Component Mount, set state according to authToken status. */
    componentDidMount = () => {
      var localAuthToken = localStorage.getItem('authToken');

      /* Check with backend if the token provides authentication. */
      network.isAuthorised(localAuthToken, (authStatus) => {
        // Set state appropriately.
        this.setState({
          loading: false,
          authenticated: authStatus,
          token: localAuthToken
        });
      });
    }

    render = () => {
      if (this.state.loading) {
        return(<LandingPage/>);
      }
      else if (this.state.authenticated) {
        return (<HomePage/>);
      }
      else {
        return (<LoginPage />);
      }
    } 

}

export default App;