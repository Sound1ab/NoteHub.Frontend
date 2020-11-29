import { InMemoryCacheConfig, makeVar } from '@apollo/client'

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
  isPreviewActiveVar: makeVar(false),
  isSideBySideActiveVar: makeVar(false),
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
  isPreviewActive() {
    return localState.isPreviewActiveVar()
  },
  isSideBySideActive() {
    return localState.isSideBySideActiveVar()
  },
}

export type Fields = typeof fields

export const cacheOptions: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        ...fields,
        isDarkMode: {
          read() {
            return localState.currentThemeVar() === COLOR_MODE.DARK
          },
        },
        readFiles: {
          merge: false,
        },
      },
    },
  },
}
