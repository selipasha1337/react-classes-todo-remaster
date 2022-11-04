import { Component } from 'react'
import './Footer.css'

class Footer extends Component {
  render() {
    const { children } = this.props

    return <footer className="footer">{children}</footer>
  }
}

export default Footer
