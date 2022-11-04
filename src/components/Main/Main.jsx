import { Component } from 'react'
import './Main.css'

class Main extends Component {
  render() {
    const { children } = this.props

    return <section className="main">{children}</section>
  }
}

export default Main
