import { Component } from 'react'

// TODO: Сделать рабочий таймер
// TODO: придумать другой способ прокидывать пропсы

class TaskCountdown extends Component {
  state = {
    minutes: 0,
    seconds: 0,
    isStart: false,
    isDisabled: false,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.seconds !== prevState.seconds || nextProps.minutes !== prevState.minutes) {
      return {
        minutes: nextProps.minutes,
        seconds: nextProps.seconds,
      }
    }
    return null
  }

  tick = () => {
    const { minutes, seconds } = this.state

    if (seconds > 0) {
      this.setState({ seconds: seconds - 1 })
    } else if (minutes > 0) {
      this.setState({
        minutes: minutes - 1,
        seconds: seconds + 59,
      })
    } else if (Number(minutes) === 0 && Number(seconds) === 0) {
      this.setState({ isStart: false })
      this.setState({ isDisabled: true })
    }
  }

  start = () => {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  change = () => {
    const { isStart } = this.state
    if (!isStart) {
      this.start()
      this.setState({ isStart: true })
    } else {
      this.pause()
      this.setState({ isStart: false })
    }
  }

  pause = () => {
    clearInterval(this.timerID)
  }

  disabledHandler = () => {
    return this.state.isDisabled ? { cursor: 'not-allowed' } : { cursor: 'pointer' }
  }

  addLeadingZeros = (num, totalLength) => {
    return String(num).padStart(totalLength, '0')
  }

  render() {
    const { isStart, isDisabled } = this.state
    const { minutes, seconds } = this.props

    return (
      <span className="description">
        <button
          className={`icon icon-${isStart ? 'pause' : 'play'}`}
          onClick={this.change}
          disabled={isDisabled}
          style={this.disabledHandler()}
        ></button>
        {this.addLeadingZeros(minutes, 2)}:{this.addLeadingZeros(seconds, 2)}
      </span>
    )
  }
}

export default TaskCountdown
