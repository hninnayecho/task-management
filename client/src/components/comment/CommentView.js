import React, { Component } from 'react';

class CommentView extends Component {
  render() {
    return(
        <div className="from">
          <span className="value">{this.props.comment.description}</span>
        </div>
    )
  }
}
export default CommentView;