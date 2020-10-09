import { useApolloClient } from '@apollo/client'
import React, { ReactNode, useRef } from 'react'
import { Redirect } from 'react-router-dom'

import {
  useDarkMode,
  useLogout,
  useModalToggle,
  useReadGithubUser,
} from '../../../../../hooks'
import { styled } from '../../../../../theme'
import { Fade } from '../../../../animation'
import { Dropdown } from '../../../../atoms'
import { currentJwtVar } from '../../../../providers/ApolloProvider/cache'
import { Avatar } from './Avatar/Avatar'

interface IProfile {
  children?: ReactNode
}

export function Profile(props: IProfile) {
  const client = useApolloClient()
  const { isDarkMode, toggleTheme } = useDarkMode()
  const containerRef = useRef(null)
  const user = useReadGithubUser()
  const [logout, { called, data, error }] = useLogout()
  const { isOpen, Portal, ref, setOpen } = useModalToggle()

  if (error) {
    alert('Could not logout. Please try again.')
  }

  if (called && data?.logout === 'ok') {
    currentJwtVar(null)
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

  return (
    <Wrapper {...props} ref={containerRef}>
      <Avatar image={user?.avatar_url} onClick={handleOpen} />
      <Fade show={isOpen}>
        <Portal
          domNode={containerRef.current}
          placementAroundContainer="bottom-left"
        >
          <Dropdown
            ref={ref}
            items={[
              {
                icon: 'sign-out-alt' as const,
                prefix: 'fa' as const,
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
                prefix: 'fa' as const,
                label: isDarkMode ? 'Light theme' : 'Dark theme',
                onClick: toggleTheme,
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
