import { InMemoryCache, makeVar } from '@apollo/client'

import { COLOR_MODE } from '../../../enums'

export const currentRepoNameVar = makeVar('NoteHub.Notebook')
export const currentPathVar = makeVar('')
export const currentThemeVar = makeVar<COLOR_MODE>(COLOR_MODE.DARK)
export const cursorPositionVar = makeVar({
  ch: 0,
  line: 0,
  __typename: 'Position',
})
export const currentJwtVar = makeVar<string | null>(null)
export const accentColorVar = makeVar<string | null>(null)
export const searchVar = makeVar('')

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        currentRepoName() {
          return currentRepoNameVar()
        },
        currentPath() {
          return currentPathVar()
        },
        currentTheme() {
          return currentThemeVar()
        },
        cursorPosition() {
          return cursorPositionVar()
        },
        currentJwt() {
          return currentJwtVar()
        },
        accentColor() {
          return accentColorVar()
        },
        searchVar() {
          return searchVar()
        },
      },
    },
  },
})
