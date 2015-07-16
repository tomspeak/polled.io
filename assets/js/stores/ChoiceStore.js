import React from 'react'
import EventEmitter from 'events'
import Assign from 'object-assign'
import _ from 'lodash'

import ChoiceConstants from '../constants/ChoiceConstants'

import { registerActions } from '../utils/storeutils'

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


registerActions ({
  [ChoiceConstants.INIT_CHOICES]: () => {
    ChoiceStore.emitChange()
  },

  [ChoiceConstants.ADD_CHOICE]: () => {
    add()
  },

  [ChoiceConstants.REMOVE_CHOICE]: (action) => {
      remove(action.index)
  },

  [ChoiceConstants.GET_CHOICES]: (action) => {
      ChoiceStore.emitChange()
  },

  [ChoiceConstants.UPDATE_VALUE]: (action) => {
      updateValue(action.index, action.value)
  }
})


export default ChoiceStore
