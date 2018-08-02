import React, { Component } from 'react';
import { DefaultComponent } from '../Components';


class DefaultView extends Component {

    constructor(props) {
        super(props);
        console.log("DefaultView Constructed");
    }

    render() {
        return (
            <div className="App">
            <DefaultComponent />
            <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
            </p>
        </div>
        );
    }
}

export default DefaultView;
