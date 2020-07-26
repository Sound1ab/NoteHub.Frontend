import { useApolloClient } from '@apollo/react-hooks'
import React, { useRef } from 'react'

import {
  useDarkMode,
  useLogout,
  useModalToggle,
  useReadGithubUser,
} from '../../../hooks'
import { styled } from '../../../theme'
import { Fade } from '../../animation'
import { Avatar, Dropdown } from '../../atoms'

const Style = styled.div`
  position: relative;
  cursor: pointer;

  .Profile-dropdown {
    position: absolute;
    top: calc(100% + ${({ theme }) => theme.spacing.xs});
    right: ${({ theme }) => theme.spacing.xxs};
    z-index: 100;
  }
`

export function Profile() {
  const client = useApolloClient()
  const { isDarkMode, toggleTheme } = useDarkMode()
  const containerRef = useRef(null)
  const user = useReadGithubUser()
  const [logout, { called, data }] = useLogout()
  const { isOpen, Portal, ref, setOpen } = useModalToggle()

  if (called && data?.logout === 'ok') {
    client.clearStore()
    client.writeData({ data: { jwt: null } })
  }

  function handleOpen() {
    setOpen(true)
  }

  function gitlink() {
    window.open(user?.html_url)
  }

  return (
    <Style ref={containerRef}>
      <Avatar image={user?.avatar_url} onClick={handleOpen} />
      <Fade show={isOpen}>
        <Portal domNode={containerRef.current} className="Profile-dropdown">
          <Dropdown
            ref={ref}
            items={[
              {
                icon: 'sign-out-alt' as const,
                prefix: 'fa' as const,
                label: 'Logout',
                onClick: () => logout(),
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
    </Style>
  )
}
