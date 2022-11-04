import { Component } from 'react'
import './TaskList.css'

import Task from '../Task/Task'

class TaskList extends Component {
  renderTasks = () => {
    const { tasks, removeTask, editTask, editId, saveTask } = this.props

    return tasks.map((task) => {
      return (
        <Task
          key={task.id}
          task={task}
          removeTask={removeTask}
          editTask={editTask}
          editId={editId}
          saveTask={saveTask}
        />
      )
    })
  }

  render() {
    return <ul className="todo-list">{this.renderTasks()}</ul>
  }
}

export default TaskList
