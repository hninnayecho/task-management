import React, { Component } from 'react';
import axios from 'axios';
import CommentView from './CommentView';

class CommentList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
      return (
      <div>
        <h1>List of Comments</h1>
        {
            Object
              .keys(this.props.comments)
              .map(key => <CommentView key={key} comment={this.props.comments[key]} />)
          }
      </div>
    );
  }
}
export default CommentList;
