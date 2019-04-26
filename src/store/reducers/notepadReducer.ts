import {TNotepadActions, TReturnOfSetActiveNote, TReturnOfSetActiveNotepad, TReturnOfSetAllNotepads } from '../actions/notepadAction'
import {NOTEPAD_ACTIONS} from '../actions/notepadAction'
import {IState} from '../index'

export function notepadReducer(state: IState, action: TNotepadActions) {
  switch (action.type) {
    case NOTEPAD_ACTIONS.SET_ACTIVE_NOTE:
      return {
        ...state,
        activeNote: (action as TReturnOfSetActiveNote).payload.id
      }
    case NOTEPAD_ACTIONS.SET_ACTIVE_NOTEPAD:
      return {
        ...state,
        activeNotepad: (action as TReturnOfSetActiveNotepad).payload.id
      }
    case NOTEPAD_ACTIONS.SET_ALL_NOTEPADS:
      return {
        ...state,
        allNotepads: (action as TReturnOfSetAllNotepads).payload.notepads
      }
    default:
      throw new Error()
  }
}