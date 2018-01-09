import React, { Component } from "react";
import ClickToEdit from 'react-click-to-edit';

class EditTaskName extends Component {
    
    constructor(props){
        super(props);
        this.updateTaskName = this.updateTaskName.bind(this);
    }

    updateTaskName(value){
       var chgValue = this;
       var update = {
           name: value,
           dueDate: chgValue.props.task.dueDate,
           label: chgValue.props.task.label,
       };
       this.props.updateName(update);
    }
    render (){
        return(
            <ClickToEdit
            endEditing= {this.updateTaskName}>
            {this.props.task.name}
    </ClickToEdit>
        )
    }
}
export default EditTaskName;