import { useApolloClient } from '@apollo/client'
import React, { ReactNode, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import { FONT, THEME_SETTINGS } from '../../../../../enums'
import {
  useCodeMirror,
  useLogout,
  useModalToggle,
  useReadGithubUser,
  useReadRetextSettings,
  useReadThemeSettings,
} from '../../../../../hooks'
import { Fade } from '../../../../animation'
import { Retext_Settings } from '../../../../apollo'
import { Dropdown } from '../../../../atoms'
import { CheckboxItem } from '../../../../atoms/Dropdown/CheckboxItem/CheckboxItem'
import { RadioItem } from '../../../../atoms/Dropdown/RadioItem/RadioItem'
import { localState } from '../../../../providers/ApolloProvider/cache'
import { Avatar } from './Avatar/Avatar'

interface IProfile {
  children?: ReactNode
}

export function Profile(props: IProfile) {
  const client = useApolloClient()
  const themeSettings = useReadThemeSettings()
  const containerRef = useRef(null)
  const user = useReadGithubUser()
  const [logout, { called, data, error }] = useLogout()
  const { isOpen, Portal, ref, setOpen } = useModalToggle<HTMLUListElement>()
  const retextSettings = useReadRetextSettings()
  const { onRefresh } = useCodeMirror()

  if (error) {
    alert('Could not logout. Please try again.')
  }

  if (called && data?.logout === 'ok') {
    localState.currentJwtVar(null)
    client.cache.gc()

    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    )
  }

  function handleOpen() {
    setOpen(true)
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

  return (
    <Wrapper {...props} ref={containerRef}>
      <Avatar image={user?.avatar_url} onClick={handleOpen} />
      <Fade show={isOpen}>
        <Portal
          domNode={containerRef.current}
          placementAroundContainer="bottom-left"
        >
          <Dropdown
            containerRef={ref}
            items={[
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
            ]}
          />
        </Portal>
      </Fade>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
`
