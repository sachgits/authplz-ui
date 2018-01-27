import React from 'react';

import Moment from 'react-moment';

import AuthPlz from '../../AuthPlz';
import AlertView from '../../components/AlertView';

export default class AccountPage extends React.Component {
    constructor(props) {
        super(props);
    // Create form state
        this.state = {
            user: {},
            alert: '',
        };

        AuthPlz.Account().then((user) => {
            this.setState({ user });
        }, (err) => {
            console.log(err);
            this.setState({ alert: err });
        });
    }

    render() {
        const {
            user,
            alert,
        } = this.state;
        if (user == null) {
            return (
                <div>No user logged in</div>
            );
        }

        return (
            <div>
                <h3>User: {user.Username}</h3>
                <div>Email: {user.Email}</div>
                <div>Created At: <Moment fromNow>{user.CreatedAt}</Moment></div>
                <div>Last Login: <Moment fromNow>{user.LastLogin}</Moment></div>
                <AlertView alert={alert} />

            </div>
        );
    }
}
