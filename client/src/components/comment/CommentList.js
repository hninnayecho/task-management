import React, { Component } from 'react';
import axios from 'axios';
import CommentView from './CommentView';
import "./comment.css";

class CommentList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="commetView">
        <p>List of Comments</p>
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
