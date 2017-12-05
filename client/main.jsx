import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import App from '../imports/ui/App.jsx';
 
Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Tasks } from '../api/tasks.js';
 
import Task from './Task.jsx';
 
// App component - represents the whole app
class App extends Component {
  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }
...some lines skipped...
    );
  }
}
 
App.propTypes = {
  tasks: PropTypes.array.isRequired,
};
 
export default createContainer(() => {
  return {
    tasks: Tasks.find({}).fetch(),
  };
}, App);
<div className="container">
        <header>
          <h1>Todo List</h1>
 
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks"
            />
          </form>
        </header>
 
        <ul>
        import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Tasks } from '../api/tasks.js';
...some lines skipped...
 
// App component - represents the whole app
class App extends Component {
  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
 
  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />