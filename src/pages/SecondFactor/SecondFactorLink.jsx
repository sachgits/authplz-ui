import React from 'react';

const SecondFactorLink = props =>
    <div>
        <a href={props.info.link}><h3>{props.info.type}</h3></a>
        <p>{props.info.description}</p>
    </div>;

SecondFactorLink.propTypes = {
    info: React.PropTypes.object.isRequired,
};
