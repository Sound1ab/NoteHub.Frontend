import { InMemoryCacheConfig, makeVar } from '@apollo/client'

import { FONT, THEME_SETTINGS } from '../../../enums'
import { Retext_Settings } from '../../apollo/generated_components_typings'

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

export const cacheOptions: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        activeRetextSettings() {
          return (
            Object.entries(localState.retextSettingsVar())
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              .filter(([_, value]) => value)
              .map(([setting]) => setting)
          )
        },
        readFiles: {
          merge: false,
        },
      },
    },
  },
}
