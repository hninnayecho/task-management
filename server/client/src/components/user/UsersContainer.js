import React, { Component } from 'react';
import UserView from './UserView';
import Header from '../../Header';
import cookie from 'js-cookie';

class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [
      ]
    };
    this.handleSignout = this.handleSignout.bind(this);
  }

  componentDidMount() {
    var self = this;
    fetch('/api/users', {credentials: 'same-origin'}).then(function (response) {
      return response.json();
    }).then(function (json) {
      self.setState({
        users: json
      })
    });
  }

  handleSignout(event) {
    event.preventDefault();
    console.log('handleSignout');
    var self = this;
    fetch('/api/logout').then(function (response) {
      return response.json();
    }).then(function (json) {
      cookie.set('authenticated', false);
      self.props.history.push('/login');
    });
  }

  render() {
    return (
      <div>
        <Header history= {this.props.history}/>
        <table>
          <tr>
            <td>UserName</td>
            <td>Email</td>
          </tr>
          {
            Object
              .keys(this.state.users)
              .map(key => <UserView key={key} user={this.state.users[key]}/>)
          }

        </table>

      </div>
    );
  }
}
export default Users;
