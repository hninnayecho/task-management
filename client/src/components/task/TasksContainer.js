import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import TaskView from './TaskView';
import TaskForm from './TaskForm';

import Header from '../../Header';

import cookie from 'js-cookie';

class TasksContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [
      ]
    };
    this.addTaskToList = this.addTaskToList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
  }

 componentDidMount() {
    var self = this;
    fetch('/api/tasks', { credentials: 'same-origin' }).then(function (response) {
      return response.json();
    }).then(function (json) {
      self.setState({
        tasks: json
      })
    });
  }

  handleSubmit(task) {
    let self = this;
    let name = task.name
    let dueDate = task.dueDate;
    let label = task.label;
    axios
      .post("/api/tasks/add", {
        name,
        dueDate,
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

  addTaskToList(task) {
    var self = this;
    var ts = Date.now();
    var newTask = {};
    newTask['task' + ts] = task;
    var currentTasks = { ...this.state.tasks };
    var newTasks = Object.assign(currentTasks, newTask);
    self.setState({ tasks: newTasks });
  }

  renderTasks() {
    return this.state.tasks.map(task => (
      <TaskView key={task.name}
        task={task} />
    ))
  }

  updateTask(update) {
    let self = this;
    let id =  update.id;
    let name = update.name;
    let dueDate = update.dueDate;
    let label = update.label;
    axios
      .post("/api/tasks/update", {
        id,
        name,
        dueDate,
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
    console.log('handleSignout');
    var self = this;
    fetch('/api/logout').then(function (response) {
      return response.json();
    }).then(function (json) {
      cookie.set('authenticated', false);
      self.props.history.push('/login');
    });
  }

  render() {
    return (
      <div>
        <button onClick={(e) => this.handleSignout(e)}>Logout</button>
        <Header />
        <TaskForm addTask={this.handleSubmit} />
        <table>
          <tr>
            <td>Name</td>
            <td>DueDate</td>
            <td>Label</td>
          </tr>
          {
            Object
              .keys(this.state.tasks)
              .map(key => <TaskView key={key} task={this.state.tasks[key]} update={this.updateTask} />)
          }

        </table>

      </div>
    );
  }
}
export default TasksContainer;
