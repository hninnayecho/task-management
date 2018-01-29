import React, { Component } from 'react';
import './comment.css';
class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
          tasks: [
          ]
        };
        this.addNewCommment = this.addNewCommment.bind(this);
      }

      addNewCommment(e) {
        var chgValue = this;
        e.preventDefault();
        this.props.addComment(chgValue.comment.value);
    }

    render() {
        return (
            <form className="add-Comment"  onSubmit={(e) => this.addNewCommment(e)}>
                <input ref={(input) => this.comment = input} type="text" placeholder="Comment" />
                <button type="submit">Comment</button>
            </form>
        );
    }
}

export default CommentForm;