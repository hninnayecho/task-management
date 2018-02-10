import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            label: "Pending",
            dueDate: new Date
        };
        this.addNewTask = this.addNewTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.chooseDate = this.chooseDate.bind(this);
    }

    addNewTask(e) {
        e.preventDefault();
        var task = {
            name: this.refs.taskName.getValue(),
            dueDate: this.state.dueDate,
            label: this.state.label,
        };

        this.props.addTask(task);
    }

    handleChange(event, index, value) {
        this.setState({
            label: value
        });
    }
    chooseDate(date) {
        this.setState({
            dueDate: date
        });
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <form onSubmit={(e) => this.addNewTask(e)}>
                        <p>Add task</p>
                        <TextField
                            floatingLabelText="Task Name"
                            ref="taskName" /><br />
                        <DatePicker
                            container="inline" floatingLabelText="Due Date" onChange={this.onDateChange} value={this.state.dueDate} />
                        <br />
                        <SelectField
                            floatingLabelText="Choose Label"
                            value={this.state.label}
                            onChange={this.handleChange}>
                            <MenuItem value={"Pending"} primaryText="Pending" />
                            <MenuItem value={"InProgress"} primaryText="InProgress" />
                            <MenuItem value={"Finished"} primaryText="FInished" />
                        </SelectField>
                        <br />
                        <RaisedButton style={{ color: 'white', fontSize: '15px', fontWeight: 'bold' }}
                            label="Add Task" primary={true} type="submit" />
                    </form>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default TaskForm;