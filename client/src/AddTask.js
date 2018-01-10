import React, { Component } from 'react';
import './App.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
class AddTask extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "Pending",
            startDate: moment()
        };
        this.addNewTask = this.addNewTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.chooseDate = this.chooseDate.bind(this);
    }

    addNewTask(e) {
        var chgValue = this;
        e.preventDefault();
        var task = {
            name: chgValue.name.value,
            dueDate: chgValue.state.startDate,
            label: chgValue.state.value,
        };

        this.props.addTask(task);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }
    chooseDate(date) {
        this.setState({
            startDate: date
        });
    }

    render() {
        return (
            <form className="task-form" onSubmit={(e) => this.addNewTask(e)}>
                <p>Add task</p>

                <input ref={(input) => this.name = input} type="text" placeholder="Task Name" />

                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.chooseDate}
                    showYearDropdown
                    dateFormatCalendar="MMMM"
                />
                <div>
                    <select className="selectLabel" value={this.state.value} onChange={this.handleChange}>
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