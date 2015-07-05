import React from 'react'

import ChoiceActions from '../actions/ChoiceActions'
import ChoiceItem from './ChoiceItem.jsx'
import ChoiceStore from '../stores/ChoiceStore'


class ChoiceList extends React.Component {
  constructor (props) {
    super(props)
  }

  static propTypes = {
    choices: React.PropTypes.arrayOf(React.PropTypes.shape({
      length: React.PropTypes.number
    })),
    onChange: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onKeyUp: React.PropTypes.func
  }

  render () {
    let choiceItems = this.getChoiceItems()

    return (
      <div>
        {choiceItems}
      </div>
    )
  }

  getChoiceItems () {
    let choiceItems = [],
        lastItem = false;

    this.props.choices.map((choice, key) => {
      if (key === (this.props.choices.length - 1)) {
        lastItem = true
      }

      choiceItems.push(
        <ChoiceItem
          value={choice.value}
          key={key}
          index={key}
          count={key + 1}
          lastItem={lastItem}
          onClick={this.props.onClick}
          onChange={this.props.onChange}
        />
      )
    })

    return choiceItems
  }
}


export default ChoiceList
