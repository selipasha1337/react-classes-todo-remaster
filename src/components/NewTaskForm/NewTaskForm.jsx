import { Component } from 'react'
import './NewTaskForm.css'

class NewTaskForm extends Component {
  state = {
    newTaskValue: '',
    minutesValue: '',
    secondsValue: '',
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { newTaskValue, minutesValue, secondsValue } = this.state
    const { addTask } = this.props

    if (newTaskValue.trim() && minutesValue.trim() && secondsValue.trim()) {
      addTask(newTaskValue, Number(minutesValue), Number(secondsValue))
      this.setState({ newTaskValue: '', minutesValue: '', secondsValue: '' })
    }
  }

  validateField = (name, value) => {
    const minutesRegExp = RegExp(/^(|[0-9]\d{0,2})$/)
    const secondsRegExp = RegExp(/^(|[0-5]?[0-9]\d{0})$/)

    switch (name) {
      case 'minutesValue':
        value = minutesRegExp.test(value) ? value : value.slice(0, -1)
        break
      case 'secondsValue':
        value = secondsRegExp.test(value) ? value : value.slice(0, -1)
        break
    }

    this.setState({
      [name]: value,
    })
  }

  handleInputChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        this.validateField(e.target.name, e.target.value)
      }
    )
  }

  render() {
    const { newTaskValue, minutesValue, secondsValue } = this.state

    return (
      <form className="new-todo-form" onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          placeholder="Task"
          name="newTaskValue"
          value={newTaskValue}
          onChange={this.handleInputChange}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          name="minutesValue"
          value={minutesValue}
          onChange={this.handleInputChange}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          name="secondsValue"
          value={secondsValue}
          onChange={this.handleInputChange}
        />
        <input type="submit" className="hidden" />
      </form>
    )
  }
}

export default NewTaskForm
