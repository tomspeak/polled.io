import React from 'react'
import { Link } from 'react-router'


class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.object
  }

  constructor (props, context) {
    super(props, context)
  }

  render () {
    return (
      <div>
        <h1>
          <Link to={'/'}>Polled.io</Link>
        </h1>
        <h4><Link to={'/poll/rpxhgl'}>Test Poll</Link></h4>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}


export default App
