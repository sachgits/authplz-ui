import React from 'react';

import Moment from 'react-moment';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';

import { AlertView } from '../components/AlertView.js'


class AccountView extends React.Component {

  render() {
    return (
      <div>
        <h3>User: {this.props.user.Username}</h3>
        <Table selectable={false} bordered condensed>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            <TableRowColumn>Email</TableRowColumn>
            <TableRowColumn>{this.props.user.Email}</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>Created At</TableRowColumn>
            <TableRowColumn><Moment fromNow>{this.props.user.CreatedAt}</Moment></TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>Last Login</TableRowColumn>
            <TableRowColumn><Moment fromNow>{this.props.user.LastLogin}</Moment></TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>

      <AlertView alert={this.props.alert} />

      </div>
    );
  }

}

AccountView.propTypes = {
  user: React.PropTypes.object.isRequired,
}


export { AccountView }