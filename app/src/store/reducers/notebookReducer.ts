import {
  TNotebookActions,
  TReturnOfActiveNote,
  TReturnOfActiveNotebook,
} from '..'
import { NOTEBOOK_ACTIONS } from '..'

export const initialNotebookState = {
  activeNote: '',
  activeNotebook: '',
}

export function notebookReducer(
  state: typeof initialNotebookState,
  action: TNotebookActions
) {
  switch (action.type) {
    case NOTEBOOK_ACTIONS.ACTIVE_NOTE:
      return {
        ...state,
        activeNote: (action as TReturnOfActiveNote).payload.note,
      }
    case NOTEBOOK_ACTIONS.ACTIVE_NOTEBOOK:
      return {
        ...state,
        activeNotebook: (action as TReturnOfActiveNotebook).payload.notebook,
      }
    default:
      return state
  }
}
