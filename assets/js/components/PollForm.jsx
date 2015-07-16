import React from 'react'
import ReactDOM from 'react-dom'

import ChoiceActions from '../actions/ChoiceActions'
import ChoiceList from '../components/ChoiceList.jsx'
import ChoiceStore from '../stores/ChoiceStore'
import PollActions from '../actions/PollActions'
import PollStore from '../stores/PollStore'
import PollTitle from '../components/PollTitle.jsx'
import SubmitButton from '../components/SubmitButton.jsx'


class PollForm extends React.Component {
  constructor (props, context) {
    super(props, context);

    this._onChange = this._onChange.bind(this) //@todo: look into moving
  }

  state = {
    title: '',
    choices: [],
    url: '',
    loading: false
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount () {
    ChoiceStore.addChangeListener(this._onChange)
    PollStore.addChangeListener(this._onChange)
  }

  componentDidMount () {
    ChoiceActions.init()
  }

  componentWillUnmount () {
    ChoiceStore.removeChangeListener(this._onChange)
    PollStore.removeChangeListener(this._onChange)
  }

  render () {
    return (
      <form className="form" onSubmit={this.handleSubmit.bind(this)}>
        <PollTitle onChange={this.handleTitleChange.bind(this)} />
        <ChoiceList
          {...this.state}
          onClick={this.handleDelete.bind(this)}
          onChange={this.handleChoiceChange.bind(this)}
        />
        <SubmitButton onClick={this.handleSubmit.bind(this)} />
      </form>
    )
  }

  _onChange () {
    this.setState({
      title: this.getPollState().title,
      choices: this.getChoiceState(),
      url: this.getPollState().url
    })
  }

  getChoiceState () {
    return ChoiceStore.getState()
  }

  getPollState () {
    return PollStore.getState()
  }

  handleSubmit () {
    event.preventDefault();
    PollActions.add(this.state.title, this.state.choices, this.context.router)
  }

  handleDelete (id) {
    if (this.state.choices.length <= 2) return

    ChoiceActions.remove(id)
  }

  handleTitleChange (value) {
    PollActions.updateTitle(value)
  }

  handleChoiceChange (id, value) {
    ChoiceActions.updateValue(id, value)
  }
}


export default PollForm
