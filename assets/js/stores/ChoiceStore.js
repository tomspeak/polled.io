import React from 'react'
import EventEmitter from 'events'
import Assign from 'object-assign'
import _ from 'lodash'

import ChoiceConstants from '../constants/ChoiceConstants'
import Dispatcher from '../dispatcher/AppDispatcher'


const CHANGE_EVENT = 'change'

let _choices = [
      {
        index: 0,
        value: '',
        lastItem: false
      },
      {
        index: 1,
        value: '',
        lastItem: true
      }
    ]

const add = () => {
  if (_choices.length === 10) return null  // @todo: right place for this logic?

  _choices.push({
    index: _choices.length,
    value: ''
  })
  ChoiceStore.emitChange()
}

const remove = (index) => {
  _choices.splice(index, 1)
  ChoiceStore.emitChange()
}

const updateValue = (index, value) => {
  _choices[index].value = value
  ChoiceStore.emitChange()
}

const ChoiceStore = Assign({}, EventEmitter.prototype, {
  getState () {
    return _choices
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


Dispatcher.register ((action) => {
  switch (action.actionType) {
    case ChoiceConstants.INIT_CHOICES:
      ChoiceStore.emitChange()
      break

    case ChoiceConstants.ADD_CHOICE:
      add()
      break

    case ChoiceConstants.REMOVE_CHOICE:
      remove(action.index)
      break

    case ChoiceConstants.GET_CHOICES:
      ChoiceStore.emitChange()
      break

    case ChoiceConstants.UPDATE_VALUE:
      updateValue(action.index, action.value)
      break
  }

  return true
})


export default ChoiceStore
