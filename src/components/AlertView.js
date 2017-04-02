import React from 'react';

import Snackbar from 'material-ui/Snackbar';

class AlertView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: "",
    };
  }

  Open(message) {
      this.setState({open: true, message: message})
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        <Snackbar
          open={this.state.open}
          onTouchTap={this.handleTouchTap}
          message={this.state.message}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export { AlertView }