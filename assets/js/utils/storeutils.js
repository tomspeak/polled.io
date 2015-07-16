import { register } from '../dispatcher'

export function registerActions (handlers) {
  return register((action) => {
    if (handlers[action.type]) {
      handlers[action.type](action)
    }
    return true
  })
}
