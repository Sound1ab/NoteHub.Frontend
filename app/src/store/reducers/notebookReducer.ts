import {
  NOTEBOOK_ACTIONS,
  TNotebookActions,
  TReturnOfActiveNote,
  TReturnOfActiveNotebook,
  TReturnOfResetNotebook,
} from '..'

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
    case NOTEBOOK_ACTIONS.RESET_NOTEBOOK:
      const { notebook, note } = (action as TReturnOfResetNotebook).payload
      if ((notebook && note) || (!notebook && !note)) {
        return initialNotebookState
      }
      if (notebook) {
        return {
          ...state,
          activeNotebook: '',
        }
      }
      if (note) {
        return {
          ...state,
          activeNote: '',
        }
      }
      break
    default:
      return state
  }
}
