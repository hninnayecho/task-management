import React, { Component } from 'react';
import { Link } from 'react-router-dom'

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/users'>Users</Link></li>
        <li><Link to='/tasks'>Tasks</Link></li>
      </ul>
    </nav>
  </header>
)

export default Header;