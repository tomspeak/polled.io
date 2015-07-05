import React from 'react'

import PollActions from '../actions/PollActions'

class VoteButton extends React.Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    onClick: React.PropTypes.func
  }

  render () {
    return (
      <button type="submit" className="button button--submit">Create poll</button>
    )
  }
}


export default VoteButton

