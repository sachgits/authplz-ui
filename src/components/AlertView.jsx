import React from 'react';


const AlertView = props =>
    <div>
        <p hidden={!props.alert}>{props.alert}</p>
    </div>;

AlertView.propTypes = {
    alert: React.propTypes.object,
};

AlertView.defaultProps = {
    alert: '',
};

export default AlertView;
