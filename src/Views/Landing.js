import React, { Component } from 'react';

class Landing extends Component {

    render() {
        return (
          <div className="landing-container">
            <div style={{width: 300}}>
              <div className="progress">
                <div className="indeterminate"></div>
              </div>
            </div>
          </div>
        );
    }
}

export default Landing;
