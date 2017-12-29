import React, { Component } from 'react';
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

  addTaskToList(task) {
    var ts = Date.now();
    var newTask = {};
    newTask['task' + ts] = task;
    var currentTasks = { ...this.state.tasks };
    var newTasks = Object.assign(currentTasks, newTask);
    this.setState({ tasks: newTasks });
  }

  renderTasks() {
    return this.state.tasks.map(task => (
      <TaskView key={task.name}
        task={task} />
    ))
  }

  render() {
    return (
      <div>
        <AddTask addTask={this.addTaskToList} />
        <table>
          <tr>
            <td>Name</td>
            <td>DueDate</td>
            <td>Label</td>
          </tr>
          {
            Object
              .keys(this.state.tasks)
              .map(key => <TaskView key={key} task={this.state.tasks[key]} />)
          }

        </table>

      </div>
    );
  }
}
export default App;
