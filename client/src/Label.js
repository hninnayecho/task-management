import React, { Component } from "react";
import './Label.css'

class Label extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.task.label,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        var self = this;
        self.setState({
            value: event.target.value
        });
        var updatetTask = {
            id: self.props.task.id,
            name: self.props.task.name,
            dueDate: self.props.task.dueDate,
            label: event.target.value,
        };
        self.props.updatelabel(updatetTask);
    }

    render() {
        const label = this.props.task.label;

        if (label === "InProgress") {
            return (
                <td bgcolor="Blue">
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="Pending">Penidng</option>
                        <option value="Finished">Finished</option>
                        <option value="InProgress" selected>InProgress</option>
                    </select>
                </td>

            )
        } else if (label === "Pending") {
            return (
                <td bgcolor="#FA8072">
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="Pending" selected>Penidng</option>
                        <option value="Finished">Finished</option>
                        <option value="InProgress" >InProgress</option>
                    </select>
                </td>

            )
        } else if (label === "Finished") {
            return (
                <td bgcolor="green">
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="Pending">Penidng</option>
                        <option value="Finished" selected>Finished</option>
                        <option value="InProgress" >InProgress</option>
                    </select>
                </td>

            )
        }
    }
}
export default Label;