import React, { Component } from 'react';

class Button extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      content: ""
    };
  }
    
  render = () => {
    return (
        <a onClick={this.props.onClick} className="waves-effect waves-light btn">{this.state.title}</a>
    );
  }

}

export default Button;