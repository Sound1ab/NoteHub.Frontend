import { makeVar } from '@apollo/client'

import { COLOR_MODE } from '../../../enums'

export const localState = {
  currentRepoNameVar: makeVar('NoteHub.Notebook'),
  currentPathVar: makeVar(''),
  currentThemeVar: makeVar<COLOR_MODE>(COLOR_MODE.DARK),
  cursorPositionVar: makeVar({
    ch: 0,
    line: 0,
    __typename: 'Position',
  }),
  currentJwtVar: makeVar<string | null>(null),
  accentColorVar: makeVar<string | null>(null),
  searchVar: makeVar(''),
}

export const fields = {
  currentRepoName() {
    return localState.currentRepoNameVar()
  },
  currentPath() {
    return localState.currentPathVar()
  },
  currentTheme() {
    return localState.currentThemeVar()
  },
  cursorPosition() {
    return localState.cursorPositionVar()
  },
  currentJwt() {
    return localState.currentJwtVar()
  },
  accentColor() {
    return localState.accentColorVar()
  },
  searchVar() {
    return localState.searchVar()
  },
}

export type Fields = typeof fields
