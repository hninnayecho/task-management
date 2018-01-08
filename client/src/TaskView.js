import React, { Component } from "react";
import Label from './Label';
import EditTaskName from './EditTaskName';
class TaskView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            task : this.props.task
        }
        this.updateTask = this.updateTask.bind(this);
    }

    updateTask(update) {
        this.setState({
            task : update
        })
        this.props.update(update);
    }

    render() {
        return (
            <tr>
                <td><EditTaskName task={this.state.task} updateName={this.updateTask}/>
                    </td>
                <td>{this.state.task.dueDate}</td>
                <td><Label task={this.state.task} updatelabel={this.updateTask} /></td></tr>
        )
    }
}
export default TaskView;