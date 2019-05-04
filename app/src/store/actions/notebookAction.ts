export type TReturnOfActiveNote = ReturnType<typeof activeNote>
export type TReturnOfActiveNotebook = ReturnType<typeof activeNotebook>
export type TReturnOfResetNotebook = ReturnType<typeof resetNotebook>

export type TNotebookActions =
  | TReturnOfActiveNote
  | TReturnOfActiveNotebook
  | TReturnOfResetNotebook

export enum NOTEBOOK_ACTIONS {
  ACTIVE_NOTE = 'ACTIVE_NOTE',
  ACTIVE_NOTEBOOK = 'ACTIVE_NOTEBOOK',
  RESET_NOTEBOOK = 'RESET_NOTEBOOK',
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

export function resetNotebook({
  notebook,
  note,
}: {
  notebook?: boolean
  note?: boolean
} = {}) {
  return {
    payload: {
      note,
      notebook,
    },
    type: NOTEBOOK_ACTIONS.RESET_NOTEBOOK,
  }
}
