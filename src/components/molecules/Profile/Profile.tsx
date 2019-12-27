import React, { useRef } from 'react'

import { LOCAL_STORAGE } from '../../../enums'
import {
  deleteFromStorage,
  useDarkMode,
  useModalToggle,
  useReadGithubUser,
} from '../../../hooks'
import { styled } from '../../../theme'
import { Avatar, Dropdown } from '../../atoms'

const Style = styled.div<{ isPortalOpen: boolean }>`
  position: relative;
  pointer-events: ${({ isPortalOpen }) => (isPortalOpen ? 'none' : 'all')};

  .Profile-dropdown {
    position: absolute;
    pointer-events: ${({ isPortalOpen }) => (isPortalOpen ? 'all' : 'non')};
    bottom: -${({ theme }) => theme.spacing.xs};
    right: 0;
    z-index: 100;
    transform: translateY(100%);
  }
`

export function Profile() {
  const { isDarkMode, toggleTheme } = useDarkMode()
  const containerRef = useRef(null)
  const user = useReadGithubUser()
  const { isOpen, Portal, ref, setOpen } = useModalToggle()

  function handleOpen() {
    setOpen(true)
  }

  function logout() {
    deleteFromStorage(LOCAL_STORAGE.KEY)
    setOpen(false)
  }

  function gitlink() {
    window.open(user?.html_url)
  }

  return (
    <Style ref={containerRef} isPortalOpen={isOpen}>
      <Avatar image={user?.avatar_url} onClick={handleOpen} />
      {isOpen && (
        <Portal domNode={containerRef.current} className="Profile-dropdown">
          <Dropdown
            ref={ref}
            items={[
              {
                icon: 'sign-out-alt',
                prefix: 'fa',
                label: 'Logout',
                onClick: logout,
              },
              {
                icon: 'github',
                prefix: 'fab',
                label: 'Github',
                onClick: gitlink,
              },
              {
                icon: 'moon',
                prefix: 'fa',
                label: isDarkMode ? 'Light theme' : 'Dark theme',
                onClick: toggleTheme,
              },
            ]}
          />
        </Portal>
      )}
    </Style>
  )
}
