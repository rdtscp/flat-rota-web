import React, { Component } from 'react';

class LoadingBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: (this.props.width) ? this.props.width : 300
    };
  }
    
  render = () => {
    return (
      <div style={{width: this.state.width}}>
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      </div>
    );
  }

}

export default LoadingBar;