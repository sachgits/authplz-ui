import React from 'react';

import { Grid, Row } from 'react-flexbox-grid';

import Paper from 'material-ui/Paper';

const style = {
    height: '100%',
    margin: 20,
};

const Centerer = props =>
    <Grid fluid>
        <Row>
            <Paper style={style} zDepth={1}>
                <div style={{ display: 'flex', maxWidth: '500px', margin: '32px', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    {props.children}
                </div>
            </Paper>

        </Row>
    </Grid>;

Centerer.propTypes = {
    children: React.PropTypes.node,
};

export default Centerer;
