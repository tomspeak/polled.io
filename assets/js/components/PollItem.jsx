import React from 'react'

import PollActions from '../actions/PollActions'
import PollStore from '../stores/PollStore'
import VoteButton from '../components/VoteButton.jsx'


class PollItem extends React.Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    item: React.PropTypes.shape({
      value: React.PropTypes.string,
      votes: React.PropTypes.number
    }),
    onClick: React.PropTypes.func,
    voted: React.PropTypes.bool,
    width: React.PropTypes.number
  }

  render () {
    let voteButton = this.voteButton()

    return (
      <div>
        {this.props.item.value}
        <p>{this.props.item.votes}</p>
        <div style={{width: this.props.width + '%'}} className="poll-item__bar"></div>
        {voteButton}
      </div>
    )
  }

  voteButton () {
    return (this.props.voted ? <p>Voted</p> : <VoteButton onClick={this.props.onClick} />)
  }

}


export default PollItem
