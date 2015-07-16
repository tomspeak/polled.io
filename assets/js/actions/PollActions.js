import { dispatch, dispatchAsync } from '../dispatcher'
import PollConstants from '../constants/PollConstants'
import _ from 'lodash'
import Axios from 'axios'

const addPoll = (title, choices) => {
  _.remove(choices, (choice, key) => {
    return !choice.value
  })

  return Axios.post('/api/poll', {
    title,
    choices
  })
}

const PollActions = {
  add (title, choices, router) {
    dispatchAsync(addPoll(title, choices), {
      request: PollConstants.POLL_ADD,
      success: PollConstants.POLL_ADD_SUCCESS,
      failure: PollConstants.POLL_ADD_ERROR
    }, { title, choices, router })
  },

  get () {
    dispatch(PollConstants.POLL_GET)
  },

  getById (id) {
    dispatch(PollConstants.POLL_GET_BY_ID, { id })
  },

  voteById (id) {
    dispatch(PollConstants.POLL_VOTE, { id })
  },

  updateTitle (value) {
    dispatch(PollConstants.POLL_UPDATE_TITLE, { value })
  }
}


export default PollActions
