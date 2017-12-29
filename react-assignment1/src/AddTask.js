import React, { Component } from 'react';

class AddTask extends Component {

    addNewTask(e) {
        e.preventDefault();
        var task = {
            name: this.name.value,
            dueDate: this.dueDate.value,
            label: this.label.value,
        };
        this.props.addTask(task);

    }

    render() {
        return (
            <form className="task-form" onSubmit={(e) => this.addNewTask(e)}>
                <p>Add task</p>
                <input ref={(input) => this.name = input} type="text" placeholder="Task Name" />
                <input ref={(input) => this.dueDate = input} type="text" placeholder="DueDate" />
                <input ref={(input) => this.label = input} type="text" placeholder="Label" />
                <button type="submit">Add Task</button>
            </form>
        );
    }
}

export default AddTask;