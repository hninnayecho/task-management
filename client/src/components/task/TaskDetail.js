import React, { Component } from "react";
import Header from '../../Header';
import CommentForm from '../comment/CommentForm';
import CommentList from '../comment/CommentList';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const style = {
    height: '100%',
    width: '100%',
    margin: 10,
    padding: 5,
    display: 'inline-block',
};

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
        let userId = this.state.task.UserId;
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
            <div style={{ overflow: 'auto', height: 'inherit', display: 'block' }}>
                <MuiThemeProvider>
                    <div>
                        <Header history={this.props.history} title='Tasks' />
                    </div>
                    <div className="contentContainer">
                        <Paper style={style}>
                            <label>Name: </label>
                            <span>{this.state.task.name}</span><br />
                            <label>Label: </label>
                            <span>{this.state.task.label}</span><br />
                            <label>StartDate: </label>
                            <span>{this.state.task.startDate}</span><br />
                            <label>EndDate: </label>
                            <span>{this.state.task.endDate}</span><br />
                            <Divider />
                            <div><CommentList comments={this.state.comments} /></div>
                            <div><CommentForm addComment={this.saveComment} /> </div>
                        </ Paper>
                    </div>
                </ MuiThemeProvider>
            </div>
        );
    }
}

export default TaskDetail;
