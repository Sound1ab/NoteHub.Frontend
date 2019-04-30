export type TReturnOfSetActiveNote = ReturnType<typeof setActiveNote>
export type TReturnOfSetActiveNotebook = ReturnType<typeof setActiveNotebook>

export type TNotebookActions =
  | TReturnOfSetActiveNote
  | TReturnOfSetActiveNotebook

export enum NOTEBOOK_ACTIONS {
  SET_ACTIVE_NOTE = 'SET_ACTIVE_NOTE',
  SET_ACTIVE_NOTEBOOK = 'SET_ACTIVE_NOTEBOOK',
}

export function setActiveNote(note: string | null) {
  return {
    payload: {
      note,
    },
    type: NOTEBOOK_ACTIONS.SET_ACTIVE_NOTE,
  }
}

export function setActiveNotebook(notebook: string | null) {
  return {
    payload: {
      notebook,
    },
    type: NOTEBOOK_ACTIONS.SET_ACTIVE_NOTEBOOK,
  }
}
