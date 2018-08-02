import React, { Component } from 'react';

class InputField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      type: (this.props.type) ? this.props.type : null
    };
  }

  handleKeyPress = (event) => {
    if (event.keyCode === 13)
      this.props.onEnter();
  }
    
  render = () => {
    return (
        <input onKeyDown={this.handleKeyPress} onChange={this.props.onChange} type={this.state.type} placeholder={this.state.title}/>
    );
  }

}

export default InputField;