import React, { Component } from "react";
import Label from './Label';
class TaskView extends Component {
    render() {
        const task = this.props.task;
        console.log(task.id);
        return (
            <tr>
                <td>{this.props.task.name}</td>
                <td>{this.props.task.dueDate}</td>
                <td><Label task={this.props.task}/></td></tr>
        )
    }
}
export default TaskView;