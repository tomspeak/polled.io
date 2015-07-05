import ChoiceConstants from '../constants/ChoiceConstants'
import Dispatcher from '../dispatcher/AppDispatcher'


const ChoiceActions = {
  init () {
    Dispatcher.dispatch({
      actionType: ChoiceConstants.INIT_CHOICES
    })
  },

  add () {
    Dispatcher.dispatch({
      actionType: ChoiceConstants.ADD_CHOICE
    })
  },

  remove (index) {
    Dispatcher.dispatch({
      actionType: ChoiceConstants.REMOVE_CHOICE,
      index
    })
  },

  getChoices () {
    Dispatcher.dispatch({
      actionType: ChoiceConstants.GET_CHOICES
    })
  },

  updateValue (index, value) {
    Dispatcher.dispatch({
      actionType: ChoiceConstants.UPDATE_VALUE,
      index,
      value
    })
  }
}


export default ChoiceActions
