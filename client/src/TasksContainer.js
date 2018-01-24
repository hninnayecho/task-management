import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import TaskView from './TaskView';
import AddTask from './AddTask';

import Header from './Header';

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
    fetch('/api/tasks', {credentials: 'same-origin'}).then(function (response) {
      return response.json();
    }).then(function (json) {
      self.setState({
        tasks: json
      })
    });
  }

  handleSubmit(task) {
    var self = this;
    var url = '/api/tasks/add';
    $.ajax({
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ name: task.name, dueDate: task.dueDate, label: task.label }),
      dataType: 'json',
      url: url,
      success: function (json) {
        console.log("Save Success");
        self.setState({ tasks: json });
      },
      error: function (e) {
        console.error('api/tasks/add', e.toString());
      }
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
    var self = this;
    var url = '/api/tasks/update';
    $.ajax({
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ name: update.name, dueDate: update.dueDate, label: update.label, id: update.id }),
      dataType: 'json',
      url: url,
      success: function (json) {
        console.log("Update Success");
        self.setState({ tasks: json });
      },
      error: function (e) {
        console.error('/updateTask', e.toString());
      }
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
        <Header/>  
        <AddTask addTask={this.handleSubmit} />
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
