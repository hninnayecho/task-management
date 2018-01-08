import React, { Component } from "react";
import Label from './Label';
class TaskView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            task : this.props.task
        }
        this.updateLabelTask = this.updateLabelTask.bind(this);
    }

    updateLabelTask(updatetTask) {
        this.setState({
            task : updatetTask
        })
        this.props.update(updatetTask);
    }

    render() {
        return (
            <tr>
                <td>{this.state.task.name}</td>
                <td>{this.state.task.dueDate}</td>
                <td><Label task={this.state.task} updatelabel={this.updateLabelTask} /></td></tr>
        )
    }
}
export default TaskView;