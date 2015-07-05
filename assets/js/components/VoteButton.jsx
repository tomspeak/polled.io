import React from 'react'

import PollActions from '../actions/PollActions'
import PollStore from '../stores/PollStore'


class VoteButton extends React.Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    onClick: React.PropTypes.func
  }

  render () {
    return (
      <button className="button button--vote" onClick={this.props.onClick}>Vote</button>
    )
  }
}



export default VoteButton
