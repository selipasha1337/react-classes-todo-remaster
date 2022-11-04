import { Component } from 'react'
import { formatDistance } from 'date-fns'

import TaskCountdown from '../TaskCountdown/TaskCountdown'

class Task extends Component {
  state = {
    newTaskValue: this.props.task.title,
  }

  inputChangeHandler = (e) => {
    this.setState({ newTaskValue: e.target.value })
  }

  timeAgoFormat = (date) => {
    return formatDistance(new Date(date), new Date(), { addSuffix: true })
  }

  editFormRender = () => {
    const { newTaskValue } = this.state
    const { saveTask, task } = this.props

    return (
      <form onSubmit={(e) => saveTask(e, task.id, newTaskValue)}>
        <input type="text" className="edit" value={newTaskValue} onChange={this.inputChangeHandler} />
      </form>
    )
  }

  render() {
    const { task, removeTask, editTask, editId } = this.props

    return (
      <li className={editId === task.id ? 'editing' : ''}>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <div className="list-label">
            <span className="title">{task.title}</span>
            <TaskCountdown minutes={task.minutes} seconds={task.seconds} />
            <span className="description">{this.timeAgoFormat(task.createdAt)}</span>
          </div>
          <button className="icon icon-edit" onClick={() => editTask(task.id)}></button>
          <button className="icon icon-destroy" onClick={() => removeTask(task.id)}></button>
        </div>
        {editId === task.id ? this.editFormRender() : null}
      </li>
    )
  }
}

export default Task
