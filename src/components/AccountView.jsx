import React from 'react';

import Moment from 'react-moment';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

import AlertView from '../components/AlertView';


const AccountView = (props) => {
    if ((typeof props.user === 'undefined') || (props.user === null)) {
        return (
            <div>
                <p> No user property loaded</p>
            </div>
        );
    }

    return (
        <div>
            <h3>User: {props.user.Username}</h3>
            <Table selectable={false} bordered condensed>
                <TableBody displayRowCheckbox={false}>
                    <TableRow>
                        <TableRowColumn>Email</TableRowColumn>
                        <TableRowColumn>{props.user.Email}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Created At</TableRowColumn>
                        <TableRowColumn>
                            <Moment fromNow>{props.user.CreatedAt}</Moment>
                        </TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Last Login</TableRowColumn>
                        <TableRowColumn>
                            <Moment fromNow>{props.user.LastLogin}</Moment>
                        </TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>

            <AlertView alert={props.alert} />

        </div>
    );
};

AccountView.propTypes = {
    user: React.PropTypes.object.isRequired,
    alert: React.PropTypes.object,
};

export default AccountView;
