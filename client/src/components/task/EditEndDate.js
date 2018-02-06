import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class EditEndDate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            endDate: this.props.task.endDate
        };
        this.updateTaskDate = this.updateTaskDate.bind(this);
    }

    updateTaskDate(date) {
        var self = this;
        self.setState({
            endDate: date
        });
        var update = {
            id: self.props.task.id,
            name: self.props.task.name,
            startDate: self.props.task.startDate,
            endDate: date,
            label: self.props.task.label,
        };
        self.props.updateDueDate(update);
    }
    render() {
        return (
            <DatePicker
                dateFormat="YYYY-MM-DD"
                selected={this.state.endDate
                    ? moment(this.state.endDate)
                    : null}
                onChange={this.updateTaskDate}
            />)
    }
}
export default EditEndDate;