import React from 'react'
import { Router } from 'react-router'

import PollForm from '../components/PollForm.jsx'


class Index extends React.Component {
  constructor (props, context) {
    super(props, context)
    console.log(this.context)
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  render () {
    return (
      <div>
        <PollForm />
      </div>
    )
  }
}


export default Index
