import { Component } from 'react'

class Header extends Component {
  render() {
    const { children } = this.props

    return (
      <header className="header">
        <h1>todos</h1>
        {children}
      </header>
    )
  }
}

export default Header
