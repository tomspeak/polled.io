import React from 'react'

import PollActions from '../actions/PollActions'
import PollItem from '../components/PollItem.jsx'
import PollStore from '../stores/PollStore'


const getPollState = () => {
  return {
    poll: PollActions.getState()
  }
}

class Poll extends React.Component {
  constructor (props) {
    super(props)

    this._onChange = this._onChange.bind(this) //@todo: look into moving
  }

  static propTypes = {
    params: React.PropTypes.shape({
      id: React.PropTypes.string
    })
  }

  static contextTypes: {
    router: React.PropTypes.func.isRequired
  }

  state = {
    voted: false
  }

  render () {
    if (!this.state.choices) return null //@todo: should be async...?

    return (
      <div>
        <h1 className="heading">{this.state.title}</h1>
        <div className="poll">
          {this.state.choices.map((value, key) => {
            return (
              <PollItem
                key={key}
                item={value}
                voted={this.state.voted}
                width={(value.votes /  this.state.total_votes) * 100}
                onClick={this.handleVote.bind(this)}
              />
            )
          }, this)}
        </div>
      </div>
    )
  }

  componentDidMount () {
    PollStore.addChangeListener(this._onChange)
    PollActions.getById(this.props.params.id)
  }

  componentWillUnmount () {
    PollStore.removeChangeListener(this._onChange)
  }

  _onChange () {
    this.setState(PollStore.getState())
  }

  handleVote () {
    PollActions.voteById(this.state.item)
  }
}


export default Poll
