import Dispatcher from '../dispatcher/AppDispatcher'
import PollConstants from '../constants/PollConstants'


const PollActions = {
  add (title, choices, component) {
    Dispatcher.dispatch({
      actionType: PollConstants.POLL_ADD,
      title,
      choices,
      component
    })
  },

  addSuccess (response, component) {
    Dispatcher.dispatch({
      actionType: PollConstants.POLL_ADD_SUCCESS,
      response,
      component
    })
  },

  addError (response) {
    Dispatcher.dispatch({
      actionType: PollConstants.POLL_ADD_ERROR,
      response
    })
  },

  get () {
    Dispatcher.dispatch({
      actionType: PollConstants.POLL_GET
    })
  },

  getById (id) {
    Dispatcher.dispatch({
      actionType: PollConstants.POLL_GET_BY_ID,
      id
    })
  },

  voteById (id) {
    Dispatcher.dispatch({
      actionType: PollConstants.POLL_VOTE,
      id
    })
  },

  updateTitle (value) {
    Dispatcher.dispatch({
      actionType: PollConstants.POLL_UPDATE_TITLE,
      value
    })
  }
}


export default PollActions
