import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import DatePicker from "material-ui/DatePicker";
import SelectField from "material-ui/SelectField";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/MenuItem";

import PropTypes from "prop-types";

class TaskModalForm extends Component {

  constructor(props) {
    super(props);
    this.taskName = '';
    this.startDate = new Date();
    this.endDate = new Date();
    this.label = 'Pending';
    this.button = false;
    this.open = false;
  }

  render() {
    return (
      <Dialog
        title="Add New Task"
        actions={[
          <FlatButton label="Cancel" primary={true} onClick={this.props.handleClose} />,
          <FlatButton
            label="Submit"
            primary={true}
            disabled={this.button}
            keyboardFocused={true}
            onClick={() => this.props.handleSubmit({
              name: this.taskName,
              startDate: this.startDate,
              endDate: this.endDate,
              label: this.label
            })}
          />
        ]}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.handleClose}
        autoScrollBodyContent={true}
      >
        <div>
          <TextField hintText="Task Name" onChange={(e, newValue) => this.taskName = newValue} />
          <br />
          <DatePicker autoOk="true" hintText="Start Date" onChange={(e, newDate) => this.startDate = newDate} /><br />
          <DatePicker autoOk="true" hintText="End Date" onChange={(e, newDate) => this.endDate = newDate} />
          <SelectField
            floatingLabelText="Choose Label"
            value="Pending"
            onChange={(e, key, value) => this.label = value} >
            <MenuItem value="Pending" primaryText="Pending" />
            <MenuItem value="InProgress" primaryText="InProgress" />
            <MenuItem value="Finished" primaryText="FInished" />
          </SelectField>
        </div>
      </Dialog>
    );
  }
}

TaskModalForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default TaskModalForm;
