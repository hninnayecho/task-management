import React, { Component } from 'react';
import './App.css';
class AddTask extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "Pending",
        };
        this.addNewTask = this.addNewTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addNewTask(e) {
        var chgValue = this;
        e.preventDefault();
        var task = {
            name: this.name.value,
            dueDate: this.dueDate.value,
            label: chgValue.state.value,
        };

        this.props.addTask(task);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    render() {
        return (
            <form className="task-form" onSubmit={(e) => this.addNewTask(e)}>
                <p>Add task</p>

                <input ref={(input) => this.name = input} type="text" placeholder="Task Name" />

                <input ref={(input) => this.dueDate = input} type="text" placeholder="DueDate" />
                <div>
                    <select className = "selectLabel" value={this.state.value} onChange={this.handleChange}>
                        <option value="Pending">Penidng</option>
                        <option value="Finished">Finished</option>
                        <option value="InProgress">InProgress</option>
                    </select></div>

                <button type="submit">Add Task</button>
            </form>
        );
    }
}

export default AddTask;