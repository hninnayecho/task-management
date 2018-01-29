import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import cookie from 'js-cookie';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Menu = () => (
  <IconMenu
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
  >
    <MenuItem linkButton={true} href="/tasks" primaryText="Tasks" />
    <MenuItem linkButton={true} href="/users" primaryText="Users" />
  </IconMenu>
);


class Header extends Component {

    constructor(props) {
    super(props);
    this.handleSignout = this.handleSignout.bind(this);
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
        <MuiThemeProvider>
        <AppBar
          title='Tasks'
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          iconElementLeft={<Menu />}
          iconElementRight={<Button
            style={{ color: 'white', fontSize: '15px', fontWeight: 'bold' }} onClick={(e) => this.handleSignout(e)}>Logout</Button>}
        />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Header;