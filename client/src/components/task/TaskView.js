import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Label from './Label';
import EditTaskName from './EditTaskName';
import EditStartDate from './EditStartDate';
import EditEndDate from './EditEndDate';

class TaskView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            task: this.props.task
        }
        this.updateTask = this.updateTask.bind(this);
    }

    updateTask(update) {
        this.setState({
            task: update
        })
        this.props.update(update);
    }

    render() {
        return (
            <tr>
                <td><EditTaskName task={this.state.task} updateName={this.updateTask} /></td>
                <td><EditStartDate task={this.state.task} updateDueDate={this.updateTask} /></td>
                <td><EditEndDate task={this.state.task} updateDueDate={this.updateTask} /></td>
                <td><Label task={this.state.task} updatelabel={this.updateTask} /></td>
                <td><Link to={`/tasks/${this.state.task.id}`}>Detail</Link></td></tr>
        )
    }
}
export default TaskView;