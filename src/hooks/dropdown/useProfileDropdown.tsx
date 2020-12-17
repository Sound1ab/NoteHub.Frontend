import React from 'react'

import { Retext_Settings } from '../../components/apollo'
import { CheckboxItem } from '../../components/atoms/Dropdown/CheckboxItem/CheckboxItem'
import { ColorPickerItem } from '../../components/atoms/Dropdown/ColorPickerItem/ColorPickerItem'
import { RadioItem } from '../../components/atoms/Dropdown/RadioItem/RadioItem'
import { localState } from '../../components/providers/ApolloProvider/cache'
import { FONT, THEME_SETTINGS } from '../../enums'
import {
  useCodeMirror,
  useLogout,
  useReadGithubUser,
  useReadRetextSettings,
  useReadThemeSettings,
} from '..'

export function useProfileDropdown() {
  const retextSettings = useReadRetextSettings()
  const { onRefresh } = useCodeMirror()
  const themeSettings = useReadThemeSettings()
  const [logout, { called, data, error }] = useLogout()
  const user = useReadGithubUser()

  if (error) {
    alert('Could not logout. Please try again.')
  }

  function gitlink() {
    window.open(user?.html_url)
  }

  async function handleLogout() {
    await logout()
  }

  function handleToggleFontSetting(value: FONT) {
    localState.themeSettingsVar({
      ...themeSettings,
      font: value,
    })
    onRefresh?.()
  }

  function handleToggleThemeSetting(value: THEME_SETTINGS) {
    localState.themeSettingsVar({
      ...themeSettings,
      [value]: !themeSettings[value],
    })
    onRefresh?.()
  }

  function handleToggleRetextSetting(value: Retext_Settings) {
    localState.retextSettingsVar({
      ...retextSettings,
      [value]: !retextSettings[value],
    })
  }

  const items = [
    {
      heading: 'Font',
      custom: (
        <RadioItem
          label="Default"
          value={FONT.IS_DEFAULT}
          title="Default font"
          checked={themeSettings.font === FONT.IS_DEFAULT}
          onChange={handleToggleFontSetting}
          group="font"
        />
      ),
    },
    {
      custom: (
        <RadioItem
          label="Serif"
          value={FONT.IS_SERIF}
          title="Serif font"
          checked={themeSettings.font === FONT.IS_SERIF}
          onChange={handleToggleFontSetting}
          group="font"
        />
      ),
    },
    {
      custom: (
        <RadioItem
          label="Mono"
          value={FONT.IS_MONO}
          title="Mono font"
          checked={themeSettings.font === FONT.IS_MONO}
          onChange={handleToggleFontSetting}
          group="font"
        />
      ),
    },
    {
      heading: 'Theme',
      custom: (
        <CheckboxItem
          label="Light mode"
          value={THEME_SETTINGS.IS_LIGHT_THEME}
          title="Activate light mode"
          checked={themeSettings.isLightTheme}
          onChange={handleToggleThemeSetting}
        />
      ),
    },
    {
      custom: (
        <CheckboxItem
          label="Full width"
          value={THEME_SETTINGS.IS_FULL_WIDTH}
          title="Increase width of the editor"
          checked={themeSettings.isFullWidth}
          onChange={handleToggleThemeSetting}
        />
      ),
    },
    {
      custom: (
        <CheckboxItem
          label="Large text"
          value={THEME_SETTINGS.IS_LARGE_TEXT}
          title="Increase size of text"
          checked={themeSettings.isLargeText}
          onChange={handleToggleThemeSetting}
        />
      ),
    },
    {
      custom: <ColorPickerItem />,
      hasSeparator: true,
    },
    {
      heading: 'style check',
      label: 'Spelling',
      custom: (
        <CheckboxItem
          label="Spelling"
          value={Retext_Settings.Spell}
          title="Checks spelling"
          checked={retextSettings[Retext_Settings.Spell]}
          onChange={handleToggleRetextSetting}
        />
      ),
    },
    {
      label: 'Readability',
      custom: (
        <CheckboxItem
          label="Readability"
          value={Retext_Settings.Readability}
          title="Detects possibly hard to read sentences"
          checked={retextSettings[Retext_Settings.Readability]}
          onChange={handleToggleRetextSetting}
        />
      ),
    },
    {
      label: 'Repeated Words',
      custom: (
        <CheckboxItem
          label="Repeated Words"
          title="Checks for repeated words e.g. for for"
          value={Retext_Settings.RepeatedWords}
          checked={retextSettings[Retext_Settings.RepeatedWords]}
          onChange={handleToggleRetextSetting}
        />
      ),
    },
    {
      label: 'Indefinite Article',
      custom: (
        <CheckboxItem
          label="Indefinite Article"
          title="Checks if indefinite articles (a and an) are used correctly"
          value={Retext_Settings.IndefiniteArticle}
          checked={retextSettings[Retext_Settings.IndefiniteArticle]}
          onChange={handleToggleRetextSetting}
        />
      ),
    },
    {
      label: 'Equality',
      hasSeparator: true,
      custom: (
        <CheckboxItem
          label="Equality"
          title="Checks for possibly insensitive, inconsiderate language"
          value={Retext_Settings.Equality}
          checked={retextSettings[Retext_Settings.Equality]}
          onChange={handleToggleRetextSetting}
        />
      ),
    },
    {
      heading: 'Account',
      icon: 'github' as const,
      prefix: 'fab' as const,
      label: 'Github',
      onClick: gitlink,
    },
    {
      icon: 'sign-out-alt' as const,
      label: 'Logout',
      onClick: handleLogout,
    },
  ]

  return { items, logout: data?.logout, called }
}
