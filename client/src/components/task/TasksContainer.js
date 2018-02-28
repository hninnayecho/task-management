import React, { Component } from "react";
import axios from "axios";
import TaskView from "./TaskView";
import TaskForm from "./TaskForm";
import Header from "../../Header";
import cookie from "js-cookie";
import "./App.css";

import RaisedButton from "material-ui/RaisedButton";
import TaskModalForm from "./TaskModalForm";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

const main = {
  position: 'relative',
  display: 'flex'
}

const buttonStyle = {
  position: 'relative',
  width: '50%',
  marginTop: 20,
  width: 700,
  marginLeft: '3%',
  textAlign: 'center',
  display: 'inline-block',
  float: 'left',
};

const selectDivStyle = {
  position: 'relative',
  width: '50%',
  marginTop: 25,
  marginLeft: '70%',
  float: 'left',
  display: 'inline-block',
}

const selectStyle = {
  position: 'relative',
  width: '80%',
  textAlign: 'center'
}


class TasksContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      formOpen: false,
      label: 'All'
    };
    this.addTaskToList = this.addTaskToList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
  }

  componentDidMount() {
    var self = this;
    fetch("/api/tasks", { credentials: "same-origin" })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        self.setState({
          tasks: json
        });
      });
  }

  handleOpen() {
    this.setState({
      formOpen: true
    });
  }

  handleClose() {
    this.setState({
      formOpen: false
    });
  }

  handleSubmit(task) {
    let self = this;
    let name = task.name;
    let startDate = task.startDate;
    let endDate = task.endDate;
    let label = task.label;
    this.setState({
      open: false,
      formOpen: false
    });
    axios
      .post("/api/tasks/add", {
        name,
        startDate,
        endDate,
        label
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data.length > 0) {
          self.setState({
            open: true,
            tasks: response.data
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addTaskToList(task) {
    var self = this;
    var ts = Date.now();
    var newTask = {};
    newTask["task" + ts] = task;
    var currentTasks = { ...this.state.tasks };
    var newTasks = Object.assign(currentTasks, newTask);
    self.setState({ tasks: newTasks });
  }

  updateTask(update) {
    let self = this;
    let id = update.id;
    let name = update.name;
    let startDate = update.startDate;
    let endDate = update.endDate;
    let label = update.label;
    axios
      .post("/api/tasks/update", {
        id,
        name,
        startDate,
        endDate,
        label
      })
      .then(function (response) {
        self.setState({ tasks: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  };

  handleSignout(event) {
    event.preventDefault();
    console.log("handleSignout");
    var self = this;
    fetch("/api/logout")
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        cookie.set("authenticated", false);
        self.props.history.push("/login");
      });
  }

  handleLabelChange(e, key, value) {
    e.preventDefault();
    var self = this;
    let newTasks = [...this.state.tasks];
    this.setState({
      label: value,
      tasks: newTasks
    });
    this.forceUpdate();
  }

  render() {
    let filteredTasks;
    if (this.state.label === 'All') {
      filteredTasks = this.state.tasks;
      filteredTasks.sort((task1, task2) => task1.id > task2.id);
    } else {
      filteredTasks = this.state.tasks.filter(task => task.label === this.state.label);
      filteredTasks.sort((task1, task2) => task1.id > task2.id);
    }

    return (
      <div style={{ overflow: 'auto', height: 'inherit', display: 'block' }}>
        <MuiThemeProvider>
          <div>
            <Header history={this.props.history} title='Tasks' />
          </div>
          <div className="contentContainer">
            <Paper>
              <div style={main}>
                <div style={buttonStyle}>
                  <RaisedButton label="Add New Task" labelPosition="before" onClick={this.handleOpen} containerElement="label"/>
                </div>
                <div style={selectDivStyle}>
                  <SelectField
                    style={selectStyle}
                    value={this.state.label}
                    onChange={this.handleLabelChange} >
                    <MenuItem value="All" primaryText="All" />
                    <MenuItem value="Pending" primaryText="Pending" />
                    <MenuItem value="InProgress" primaryText="InProgress" />
                    <MenuItem value="Finished" primaryText="Finished" />
                  </SelectField>
                </div>
              </div>
              <TaskModalForm
                handleClose={this.handleClose}
                open={this.state.formOpen}
                handleSubmit={this.handleSubmit}
              />
              <Snackbar
                open={this.state.open}
                message="You created New Task!!!"
                autoHideDuration={3000}
                onRequestClose={this.handleRequestClose}
              />
              <div style={{ overflow: 'auto', height: 'inherit', display: 'block' }}>
                <table>
                  <tr>
                    <td>Name</td>
                    <td>StartDate</td>
                    <td>EndDate</td>
                    <td>Label</td>
                    <td>Detail</td>
                  </tr>
                  {
                    filteredTasks.map(task => (
                      <TaskView
                        key={task.id}
                        task={task}
                        update={this.updateTask}
                      />
                    ))
                  }
                </table>
              </div>
            </Paper>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
export default TasksContainer;
