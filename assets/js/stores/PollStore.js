import Assign from 'object-assign'
import Axios from 'axios'
import EventEmitter from 'events'
import React from 'react'
import _ from 'lodash' //OPTIMISE

import Dispatcher from '../dispatcher/AppDispatcher'
import PollConstants from '../constants/PollConstants'
import PollActions from '../actions/PollActions'

const CHANGE_EVENT = 'change'

let _poll = {
  loading: false
}

const add = (title, choices, component) => {
  _.remove(choices, (choice, key) => {
    return !choice.value
  })

  Axios.post('/api/poll', {
    title,
    choices
  })
  .then((response) => {
    PollActions.addSuccess(response, component)
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


Dispatcher.register((action) => {
  switch (action.actionType) {
    case PollConstants.POLL_ADD:
      add(action.title, action.choices, action.component)
      break

    case PollConstants.POLL_ADD_SUCCESS:
      PollStore.setState(action.response.data)
      action.component.context.router.transitionTo('/poll/' + action.response.data.url)
      break

    case PollConstants.POLL_ADD_ERROR:

      break

    case PollConstants.POLL_GET:
      PollStore.getState()
      break

    case PollConstants.POLL_GET_BY_ID:
      _poll = getById(action.id)
      break

    case PollConstants.POLL_VOTE:
      voteById(action.id)
      PollStore.emitChange()
      break

    case PollConstants.POLL_UPDATE_TITLE:
      updateTitle(action.value)
      PollStore.emitChange()
      break
  }

  return true
})


export default PollStore
