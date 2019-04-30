import {
  TNotebookActions,
  TReturnOfSetActiveNote,
  TReturnOfSetActiveNotebook,
} from '..'
import { NOTEBOOK_ACTIONS } from '..'
import { IState } from '../index'

export function notebookReducer(state: IState, action: TNotebookActions) {
  switch (action.type) {
    case NOTEBOOK_ACTIONS.SET_ACTIVE_NOTE:
      return {
        ...state,
        activeNote: (action as TReturnOfSetActiveNote).payload.note,
      }
    case NOTEBOOK_ACTIONS.SET_ACTIVE_NOTEBOOK:
      return {
        ...state,
        activeNotebook: (action as TReturnOfSetActiveNotebook).payload.notebook,
      }
    default:
      throw new Error()
  }
}
