export type TReturnOfActiveNote = ReturnType<typeof activeNote>
export type TReturnOfActiveNotebook = ReturnType<typeof activeNotebook>

export type TNotebookActions = TReturnOfActiveNote | TReturnOfActiveNotebook

export enum NOTEBOOK_ACTIONS {
  ACTIVE_NOTE = 'ACTIVE_NOTE',
  ACTIVE_NOTEBOOK = 'ACTIVE_NOTEBOOK',
}

export function activeNote(note: string | null) {
  return {
    payload: {
      note,
    },
    type: NOTEBOOK_ACTIONS.ACTIVE_NOTE,
  }
}

export function activeNotebook(notebook: string | null) {
  return {
    payload: {
      notebook,
    },
    type: NOTEBOOK_ACTIONS.ACTIVE_NOTEBOOK,
  }
}
