import React, { Component } from "react";
import Header from '../../Header';
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
        fetch(`/api/tasks/${taskId}/comments`, { credentials: 'same-origin' }).then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
            self.setState({
                comments: json
            })
        });
    }

    saveComment(comment) {
        var self = this;
        let taskId = this.state.task.id;
        let userId = this.state.task.CreatedById;
        axios
            .post(`/api/tasks/${taskId}/comments/add`, {
                comment,
                userId
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
                <Header />
                <div className="contentContainer">
                    <label>Name: </label>
                    <span>{this.state.task.name}</span><br />
                    <label>Label: </label>
                    <span>{this.state.task.label}</span><br />
                    <label>StartDate: </label>
                    <span>{this.state.task.startDate}</span><br />
                    <label>EndDate: </label>
                    <span>{this.state.task.endDate}</span><br />
                    <div><CommentList comments={this.state.comments} /></div>
                    <div><CommentForm addComment={this.saveComment} /> </div>
                </div>
            </div>
        );
    }
}

export default TaskDetail;
