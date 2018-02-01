import React, { Component } from "react";
import ClickToEdit from 'react-click-to-edit';

class EditTaskName extends Component {

    constructor(props) {
        super(props);
        this.updateTaskName = this.updateTaskName.bind(this);
    }

    updateTaskName(value) {
        var self = this;
        var update = {
            id: self.props.task.id,
            name: value,
            dueDate: self.props.task.dueDate,
            label: self.props.task.label,
        };
        self.props.updateName(update);
    }
    render() {
        return (
            <ClickToEdit
                endEditing={this.updateTaskName}>
                {this.props.task.name}
            </ClickToEdit>
        )
    }
}
export default EditTaskName;