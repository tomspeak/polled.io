import React from 'react'

import ChoiceActions from '../actions/ChoiceActions'


class ChoiceItem extends React.Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    count: React.PropTypes.number,
    index: React.PropTypes.number,
    lastItem: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onKeyUp: React.PropTypes.func,
    value: React.PropTypes.string
  }

  render () {
    return (
      <div className={'input'}>
        <input
          value={this.props.value}
          type="text"
          maxLength="255"
          placeholder={`Choice ${this.props.count}`}
          className={'input__text'}
          onChange={this.handleChange.bind(this)}
          onFocus={this.handleFocus.bind(this)}
        />
        {this.renderRemoveActionNode()}
      </div>)
  }

  renderRemoveActionNode () {
    if (this.props.count != 1 && this.props.count != 2) {
      return <span onClick={this.handleClick.bind(this)} className={'input__action'}>&times;</span>
    }
  }

  handleFocus () {
    if (!this.props.lastItem) return
    ChoiceActions.add()
  }

  handleClick () {
    this.props.onClick(this.props.index)
  }

  handleChange () {
    this.props.onChange(this.props.index, event.target.value)
  }
}


export default ChoiceItem
