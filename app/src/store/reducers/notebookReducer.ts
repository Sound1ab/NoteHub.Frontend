import {
  NOTEBOOK_ACTIONS,
  RESET_ACTION,
  TNotebookActions,
  TResetActions,
  TReturnOfActiveNote,
  TReturnOfActiveNotebook,
} from '..'

export const initialNotebookState = {
  activeNote: '',
  activeNotebook: '',
}

export function notebookReducer(
  state: typeof initialNotebookState,
  action: TNotebookActions | TResetActions
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
    case RESET_ACTION.RESET:
      return initialNotebookState
    default:
      return state
  }
}
