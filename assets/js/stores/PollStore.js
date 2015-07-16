import Assign from 'object-assign'
import Axios from 'axios'
import EventEmitter from 'events'
import React from 'react'
import _ from 'lodash' //OPTIMISE
import { registerActions } from '../utils/storeutils'

import PollConstants from '../constants/PollConstants'
import PollActions from '../actions/PollActions'

const CHANGE_EVENT = 'change'

let _poll = {
  loading: false
}

const getById = (id) => {
  Axios.get('/api/poll/' + id)
    .then((response) => {
      _poll = response.data
      PollStore.emitChange()
      return response.data
    })
    .catch((response) => {
      if (response instanceof Error) {
        console.error('Error', response.message)
      } else {
        console.error(response.data)
        console.error(response.status)
      }
    })
}

const voteById = (id) => {
  let index = _.findKey(_poll.choices, id, false)

  _poll.voted = true
  _poll.choices[index].votes = _poll.choices[index].votes += 1

  Axios.put('/api/poll/' + _poll.url + '/vote', {
      poll: _poll,
      index
    })
    .catch((response) => {
      PollActions.addError(response)
      if (response instanceof Error) {
        console.error('Error', response.message)
      } else {
        console.error(response.data)
        console.error(response.status)
      }
    })
}

const updateTitle = (value) => {
  _poll.title = value
}

const PollStore = Assign({}, EventEmitter.prototype, {
  getState () {
    return _poll
  },

  setState (poll) {
    _poll = poll
  },

  doesPollExist () {
    return _poll._id
  },

  emitChange () {
    this.emit(CHANGE_EVENT)
  },

  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }
})

registerActions({
  [PollConstants.POLL_ADD]: (action) => {
    // add loading indicator?
  },

  [PollConstants.POLL_ADD_SUCCESS]: (action) => {
    PollStore.setState(action.response.data)
    action.router.transitionTo('/poll/' + action.response.data.url)
  },

  [PollConstants.POLL_ADD_ERROR]: (action) => {
  },

  [PollConstants.POLL_GET]: (action) => {
    PollStore.getState()
  },

  [PollConstants.POLL_GET_BY_ID]: (action) => {
    _poll = getById(action.id)
  },

  [PollConstants.POLL_VOTE]: (action) => {
    voteById(action.id)
    PollStore.emitChange()
  },

  [PollConstants.POLL_UPDATE_TITLE]: (action) => {
    updateTitle(action.value)
    PollStore.emitChange()
  }
})


export default PollStore
