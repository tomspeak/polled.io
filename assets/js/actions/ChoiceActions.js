import ChoiceConstants from '../constants/ChoiceConstants'
import { dispatch } from '../dispatcher'


const ChoiceActions = {
  init () {
    dispatch(ChoiceConstants.INIT_CHOICES)
  },

  add () {
    dispatch(ChoiceConstants.ADD_CHOICE)
  },

  remove (index) {
    dispatch(ChoiceConstants.REMOVE_CHOICE)
  },

  getChoices () {
    dispatch(ChoiceConstants.GET_CHOICES)
  },

  updateValue (index, value) {
    dispatch(ChoiceConstants.UPDATE_VALUE, { index, value })
  }
}


export default ChoiceActions
