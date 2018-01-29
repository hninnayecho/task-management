import React, { Component } from "react";
import CommentForm from '../comment/CommentForm';
import CommentList from '../comment/CommentList';
import axios from 'axios';

class TaskDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: [
            ],
            comments: [
                {
                    description: 'hello'
                },
                {
                    description: 'hi'
                },
                {
                    description: 'bye'
                }
            ]
        };
        this.saveComment = this.saveComment.bind(this);
    }

    componentDidMount() {
        var self = this;
        var taskId = self.props.match.params.taskId;
        fetch(`/api/tasks/${taskId}`, { credentials: 'same-origin' }).then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);

            self.setState({
                task: json
            })
        });
    }

    saveComment(comment) {
        var self = this;
        let taskId = this.state.task.id;
        axios
            .post(`/api/tasks/${taskId}/comment/add`, {
                comment
            })
            .then(function (response) {
                console.log(response.data);
                self.setState({ comments: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <div className="from">
                    <span className="label">Name: </span>
                    <span className="value">{this.state.task.name}</span>
                </div>
                <div className="status">
                    <span className="label">Label: </span>
                    <span className="value">{this.state.task.label}</span>
                </div>
                <div className="message">
                    <span className="label">DueDate: </span>
                    <span className="value">{this.state.task.dueDate}</span>
                </div>
                <div><CommentList comments={this.state.comments} /></div>
                <div><CommentForm addComment={this.saveComment} /> </div>
            </div>

        );
    }
}

export default TaskDetail;
