import { Component } from 'react'
import './Todoapp.css'
import { v4 as uuidv4 } from 'uuid'

import Header from './components/Header/Header'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import Main from './components/Main/Main'
import TaskList from './components/TaskList/TaskList'
import Footer from './components/Footer/Footer'
import TasksFilter from './components/TasksFilter/TasksFilter'

class Todoapp extends Component {
  getLocalStorage = () => {
    let tasks = window.localStorage.getItem('tasks')
    if (tasks) {
      return JSON.parse(localStorage.getItem('tasks'))
    } else {
      return []
    }
  }

  state = {
    tasks: this.getLocalStorage(),
    editId: null,
  }

  componentDidUpdate(prevProps, prevState) {
    const { tasks } = this.state

    if (prevState.tasks !== this.state.tasks) {
      window.localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }

  createNewTask = (title, minutes, seconds) => {
    return {
      id: uuidv4(),
      title,
      createdAt: new Date(),
      isCompleted: false,
      minutes,
      seconds,
    }
  }

  addTaskHandler = (title, minutes, seconds) => {
    const { tasks } = this.state
    const newTask = this.createNewTask(title, minutes, seconds)
    this.setState({ tasks: [...tasks, newTask] })
  }

  removeTaskHandler = (id) => {
    const { tasks } = this.state
    this.setState({ tasks: tasks.filter((task) => task.id !== id) })
  }

  editTaskHandler = (id) => {
    this.setState({ editId: id })
  }

  saveTaskHandler = (e, id, title) => {
    const { tasks } = this.state

    e.preventDefault()
    if (title.trim()) {
      this.setState({
        tasks: tasks.map((task) => {
          return task.id === id ? { ...task, title } : { ...task }
        }),
      })
      this.setState({ editId: null })
    }
  }

  render() {
    const { tasks, editId } = this.state

    return (
      <div className="todoapp">
        <Header>
          <NewTaskForm addTask={this.addTaskHandler} />
        </Header>
        <Main>
          <TaskList
            tasks={tasks}
            removeTask={this.removeTaskHandler}
            editTask={this.editTaskHandler}
            editId={editId}
            saveTask={this.saveTaskHandler}
          />
          <Footer>
            <span className="todo-count">0 items left</span>
            <TasksFilter />
            <button className="clear-completed">Clear completed</button>
          </Footer>
        </Main>
      </div>
    )
  }
}

export default Todoapp
