import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './comment.css'
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
        e.preventDefault();
        this.props.addComment(this.refs.comment.getValue());
    }

    render() {
        return (
            <form className="add-Comment" onSubmit={(e) => this.addNewCommment(e)}>
                <TextField
                    style={{ width: "90%" }}
                    floatingLabelText="Write Comments"
                    ref="comment" />
                <RaisedButton style={{ color: 'white', fontSize: '15px', fontWeight: 'bold' }}
                    label="Comment" primary={true} type="submit" />
            </form>
        );
    }
}

export default CommentForm;