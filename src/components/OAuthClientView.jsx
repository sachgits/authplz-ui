import React, { PropTypes } from 'react';

import Moment from 'react-moment';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

import AlertView from './AlertView';


const OAuthClientView = (props) => {
    if ((typeof props.client === 'undefined') || (props.client === null)) {
        return (
            <div>
                <p>No client property available</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Client: {props.client.name}</h1>
            <br />

            <h3>Client ID:</h3>
            <p>{props.client.id}</p>
            <div hidden={!props.client.secret}>
                <h3>Secret:</h3>
                <p>{props.client.secret}</p>
                <p>IMPORTANT: This secret will only be displayed once.</p>
            </div>

            <Table selectable={false} bordered condensed>
                <TableBody displayRowCheckbox={false}>
                    <TableRow>
                        <TableRowColumn>Scopes</TableRowColumn>
                        <TableRowColumn>{props.client.scopes.join(', ')}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Redirects</TableRowColumn>
                        <TableRowColumn>{props.client.redirects.join(', ')}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Grants</TableRowColumn>
                        <TableRowColumn>{props.client.grants.join(', ')}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Created At</TableRowColumn>
                        <TableRowColumn>
                            <Moment fromNow>{props.client.created_at}</Moment>
                        </TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Last Update</TableRowColumn>
                        <TableRowColumn>
                            <Moment fromNow>{props.client.updated_at}</Moment>
                        </TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>

            <AlertView alert={props.alert} />

        </div>
    );
};

OAuthClientView.propTypes = {
    client: PropTypes.object.isRequired,
    alert: PropTypes.string,
};


export default OAuthClientView;
