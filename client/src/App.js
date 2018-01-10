import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import TaskView from './TaskView';
import AddTask from './AddTask';

class App extends Component {

  constructor() {
    super();
    this.state = {
      tasks: [
      ]
    };
    this.addTaskToList = this.addTaskToList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  componentDidMount() {
    var self = this;
    fetch('/tasks').then(function (response) {
      return response.json();
    }).then(function (json) {
      self.setState({
        tasks: json
      })
    });
  }

  handleSubmit(task) {
    var self = this;
    var url = '/addTask';
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
        console.error('/addTask', e.toString());
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
    var url = '/updateTask';
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

  render() {
    return (
      <div>

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
export default App;
