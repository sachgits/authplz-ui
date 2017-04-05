import React from 'react';


class AlertView extends React.Component {

  render() {
    return (
      <div>
        <p hidden={!!!this.props.alert}>{this.props.alert}</p>
      </div>
    );
  }
}

export { AlertView }