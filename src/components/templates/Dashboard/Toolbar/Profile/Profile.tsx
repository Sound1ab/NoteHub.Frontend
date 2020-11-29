import { useApolloClient } from '@apollo/client'
import React, { ReactNode, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import { COLOR_MODE } from '../../../../../enums'
import {
  useLogout,
  useModalToggle,
  useReadGithubUser,
  useReadIsDarkMode,
  useReadRetextSettings,
} from '../../../../../hooks'
import { isRetextSetting } from '../../../../../utils/typeGuards/isRetextSetting'
import { Fade } from '../../../../animation'
import { Retext_Settings } from '../../../../apollo'
import { Dropdown } from '../../../../atoms'
import { CheckboxItem } from '../../../../atoms/Dropdown/CheckboxItem/CheckboxItem'
import { localState } from '../../../../providers/ApolloProvider/cache'
import { Avatar } from './Avatar/Avatar'

interface IProfile {
  children?: ReactNode
}

export function Profile(props: IProfile) {
  const client = useApolloClient()
  const { isDarkMode } = useReadIsDarkMode()
  const containerRef = useRef(null)
  const user = useReadGithubUser()
  const [logout, { called, data, error }] = useLogout()
  const { isOpen, Portal, ref, setOpen } = useModalToggle<HTMLUListElement>()
  const retextSettings = useReadRetextSettings()

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

  function handleToggleTheme() {
    localState.currentThemeVar(isDarkMode ? COLOR_MODE.LIGHT : COLOR_MODE.DARK)
  }

  function handleToggleRetextSetting(name: string) {
    if (!isRetextSetting(name)) {
      throw new Error()
    }

    localState.retextSettingsVar({
      ...retextSettings,
      [name]: !retextSettings[name],
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
                heading: 'Theme',
                icon: 'moon' as const,
                label: isDarkMode ? 'Light' : 'Dark',
                onClick: handleToggleTheme,
                hasSeparator: true,
              },
              {
                heading: 'style check',
                label: 'Spelling',
                custom: (
                  <CheckboxItem
                    label="Spelling"
                    name={Retext_Settings.Spell}
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
                    name={Retext_Settings.Readability}
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
                    name={Retext_Settings.RepeatedWords}
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
                    name={Retext_Settings.IndefiniteArticle}
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
                    name={Retext_Settings.Equality}
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
