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

class TasksContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      formOpen: false
    };
    this.addTaskToList = this.addTaskToList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
    this.setState({ formOpen: false });
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
            self.setState({ tasks: response.data });
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
          console.log(response.data);
          self.setState({ tasks: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });
  }

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

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Header history={this.props.history} title='Tasks' />
          </div>
          <div>
            <RaisedButton label="Add New Task" onClick={this.handleOpen} />
          </div>
          <TaskModalForm
            handleClose={this.handleClose}
            open={this.state.formOpen}
            handleSubmit={this.handleSubmit}
          />
          <div>
            <table>
              <tr>
                <td>Name</td>
                <td>StartDate</td>
                <td>EndDate</td>
                <td>Label</td>
                <td>Detail</td>
              </tr>
              {Object.keys(this.state.tasks).map(key => (
                <TaskView
                  key={key}
                  task={this.state.tasks[key]}
                  update={this.updateTask}
                />
              ))}
            </table>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
export default TasksContainer;
