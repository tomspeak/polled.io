import React from 'react'
import ReactDOM from 'react-dom'


class PollTitle extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    ReactDOM.findDOMNode(this.refs.title).focus()
  }

  render() {
    return (
      <input
        className="input__text input__text--title"
        max="255"
        onChange={this.handleTitleChange.bind(this)}
        placeholder="Poll Title"
        ref="title"
        type="text"
      />
    )
  }

  handleTitleChange () {
    this.props.onChange(event.target.value)
  }
}

export default PollTitle
