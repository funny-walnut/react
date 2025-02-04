import React, { Component } from 'react';

class ErrorButton extends Component {
  state = { throwError: false };

  handleClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Test error triggered!');
    }

    return <button onClick={this.handleClick}>Trigger Error</button>;
  }
}

export default ErrorButton;
