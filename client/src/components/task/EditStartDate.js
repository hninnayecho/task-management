import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class EditStartDate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: this.props.task.startDate
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
            startDate: date,
            endDate: self.props.task.endDate,
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
export default EditStartDate;