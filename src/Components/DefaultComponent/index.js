import React, { Component } from 'react';

class DefaultComponent extends Component {

    constructor(props) {
        super(props);
        console.log("DefaultComponent Constructed");
    }

    render() {
        return (
            <div>
                I am a default component.
            </div>
        );
    }

}

export default DefaultComponent;