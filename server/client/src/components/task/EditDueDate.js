import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class EditDueDate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: this.props.task.dueDate
        };
        this.updateTaskDate = this.updateTaskDate.bind(this);
    }

    updateTaskDate(date) {
        var self = this;
        self.setState({
            startDate: date
        });
        var update = {
            id: self.props.task.id,
            name: self.props.task.name,
            dueDate: date,
            label: self.props.task.label,
        };
        self.props.updateDueDate(update);
    }
    render() {
        return (
            <DatePicker
                dateFormat="YYYY-MM-DD"
                selected={this.state.startDate
                    ? moment(this.state.startDate)
                    : null}
                onChange={this.updateTaskDate}
            />)
    }
}
export default EditDueDate;