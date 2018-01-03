import React, { Component } from "react";
import Label from './Label';
class TaskView extends Component {
    render() {
        const task = this.props.task;
        console.log(task);
        return (
            <tr>
                <td>{this.props.task.name}</td>
                <td>{this.props.task.dueDate}</td>
                <Label label={this.props.task.label} /></tr>
        )
    }
}
export default TaskView;