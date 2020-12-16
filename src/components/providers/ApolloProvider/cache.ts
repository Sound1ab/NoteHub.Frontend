import { InMemoryCacheConfig, makeVar } from '@apollo/client'

import { FONT, THEME_SETTINGS } from '../../../enums'
import { Retext_Settings } from '../../apollo'

export const localState = {
  currentRepoNameVar: makeVar('NoteHub.Notebook'),
  currentPathVar: makeVar(''),
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
  retextSettingsVar: makeVar({
    [Retext_Settings.Spell]: false,
    [Retext_Settings.Equality]: false,
    [Retext_Settings.IndefiniteArticle]: false,
    [Retext_Settings.RepeatedWords]: false,
    [Retext_Settings.Readability]: false,
  }),
  themeSettingsVar: makeVar({
    [THEME_SETTINGS.IS_LIGHT_THEME]: false,
    [THEME_SETTINGS.IS_FULL_WIDTH]: false,
    [THEME_SETTINGS.IS_LARGE_TEXT]: false,
    [THEME_SETTINGS.FONT]: FONT.IS_DEFAULT,
  }),
  tabsVar: makeVar<Set<string>>(new Set([])),
}

export const fields = {
  currentRepoName() {
    return localState.currentRepoNameVar()
  },
  currentPath() {
    return localState.currentPathVar()
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
  retextSettings() {
    return localState.retextSettingsVar()
  },
  activeRetextSettings() {
    return (
      Object.entries(localState.retextSettingsVar())
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => value)
        .map(([setting]) => setting)
    )
  },
  themeSettings() {
    return localState.themeSettingsVar()
  },
  tabs() {
    return localState.tabsVar()
  },
}

export type Fields = typeof fields

export const cacheOptions: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        ...fields,
        readFiles: {
          merge: false,
        },
      },
    },
  },
}
