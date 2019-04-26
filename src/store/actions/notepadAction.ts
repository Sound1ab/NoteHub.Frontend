import { INotepad } from '../../interfaces'

export type TReturnOfSetActiveNote = ReturnType<typeof setActiveNote>
export type TReturnOfSetActiveNotepad = ReturnType<typeof setActiveNotepad>
export type TReturnOfSetAllNotepads = ReturnType<typeof setAllNotepads>

export type TNotepadActions =
  | TReturnOfSetActiveNote
  | TReturnOfSetActiveNotepad
  | TReturnOfSetAllNotepads

export enum NOTEPAD_ACTIONS {
  SET_ACTIVE_NOTE = 'SET_ACTIVE_NOTE',
  SET_ACTIVE_NOTEPAD = 'SET_ACTIVE_NOTEPAD',
  SET_ALL_NOTEPADS = 'SET_ALL_NOTES',
}

export function setActiveNote(id: string) {
  return {
    payload: {
      id
    },
    type: NOTEPAD_ACTIONS.SET_ACTIVE_NOTE
  }
}

export function setActiveNotepad(id: string) {
  return {
    payload: {
      id
    },
    type: NOTEPAD_ACTIONS.SET_ACTIVE_NOTEPAD
  }
}

export function setAllNotepads(notepads: INotepad[]) {
  return {
    payload: {
      notepads
    },
    type: NOTEPAD_ACTIONS.SET_ALL_NOTEPADS
  }
}