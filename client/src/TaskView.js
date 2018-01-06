import React, { Component } from "react";
import Label from './Label';
class TaskView extends Component {

    constructor(props) {
        super(props);
        this.updateLabelTask = this. updateLabelTask.bind(this);
    }

    updateLabelTask(task) {
        this.props.update(task);
    }

    render() {
        const task = this.props.task;
        console.log(task.id);
        return (
            <tr>
                <td>{this.props.task.name}</td>
                <td>{this.props.task.dueDate}</td>
                <td><Label task={this.props.task} updatelabel={this.updateLabelTask} /></td></tr>
        )
    }
}
export default TaskView;