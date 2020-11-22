import { useApolloClient } from '@apollo/client'
import React, { ReactNode, useRef } from 'react'
import { Redirect } from 'react-router-dom'

import { COLOR_MODE } from '../../../../../enums'
import {
  useLogout,
  useModalToggle,
  useReadGithubUser,
  useReadIsDarkMode,
} from '../../../../../hooks'
import { styled } from '../../../../../theme'
import { Fade } from '../../../../animation'
import { Dropdown } from '../../../../atoms'
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
                icon: 'sign-out-alt' as const,
                label: 'Logout',
                onClick: handleLogout,
              },
              {
                icon: 'github' as const,
                prefix: 'fab' as const,
                label: 'Github',
                onClick: gitlink,
              },
              {
                icon: 'moon' as const,
                label: isDarkMode ? 'Light theme' : 'Dark theme',
                onClick: handleToggleTheme,
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
