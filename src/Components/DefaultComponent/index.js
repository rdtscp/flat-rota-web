import React, { Component } from 'react';

import logo from '../../Resources/logo.svg';

class DefaultComponent extends Component {

    constructor(props) {
        super(props);
        console.log("DefaultComponent Constructed");
    }

    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
            </header>
        );
    }

}

export default DefaultComponent;