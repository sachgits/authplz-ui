import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

class FidoAuthorizeView extends React.Component {

  render() {
    return (
      <div>
        <p>Please insert your U2F / Fido token and press the button if available</p>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <div hidden={!this.props.pending}> <CircularProgress /> </div>
        </div>
        <p hidden={!this.props.error}>{this.props.error}</p>

        <div hidden={!this.props.retry}>
          <RaisedButton label="Retry" primary={true} onClick={this.props.onRetry} />
        </div>

        <p hidden={!this.props.done}>U2F Authorization Complete</p>
      </div>
    );
  }
}

FidoAuthorizeView.propTypes = {
  pending: React.PropTypes.bool.isRequired,
  retry: React.PropTypes.bool.isRequired,
  onRetry: React.PropTypes.func.isRequired,
  done: React.PropTypes.bool.isRequired,
  error: React.PropTypes.string.isRequired,
}


export { FidoAuthorizeView }