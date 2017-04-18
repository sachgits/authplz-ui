import React, { PropTypes } from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

const FidoAuthorizeView = props =>
    <div>
        <p>Please insert your U2F / Fido token and press the button if available</p>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <div hidden={!props.pending}> <CircularProgress /> </div>
        </div>
        <p hidden={!props.error}>{props.error}</p>

        <div hidden={!props.retry}>
            <RaisedButton label="Retry" primary onClick={props.onRetry} />
        </div>

        <p hidden={!props.done}>U2F Authorization Complete</p>
    </div>;

FidoAuthorizeView.propTypes = {
    pending: PropTypes.bool.isRequired,
    retry: PropTypes.bool.isRequired,
    onRetry: PropTypes.func.isRequired,
    done: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
};

export default FidoAuthorizeView;
