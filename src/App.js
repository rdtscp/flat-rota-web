import React, { Component } from 'react';

import DefaultView from './Views/DefaultView.js';

class App extends Component {

  constructor(props) {
    super(props);
    console.log("React App Running...");
  }

  render() {
    return(<DefaultView />);
  } 

}

export default App;
