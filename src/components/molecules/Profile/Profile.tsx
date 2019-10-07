import React, { useContext, useEffect } from 'react'
import { Popup } from '..'
import { COLOR, COLOR_MODE } from '../../../enums'
import { useStore } from '../../../hooks'
import { useReadGithubUser } from '../../../hooks/user/useReadGithubUser'
import { username } from '../../../store'
import { styled } from '../../../theme'
import { Avatar, Heading, Icon } from '../../atoms'
import { ColorModeContext } from '../../utility'

const Style = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.m};

  .Profile-avatar {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }

  .Profile-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export function Profile() {
  const [state, dispatch] = useStore()
  const user = useReadGithubUser()
  const { colorMode, setColorMode } = useContext(ColorModeContext)

  const oppositeColorMode =
    colorMode === COLOR_MODE.LIGHT ? COLOR_MODE.DARK : COLOR_MODE.LIGHT
  
  useEffect(() => {
    if (state.user.username || !user) {
      return
    }
    dispatch(username((user && user.login) || ''))
  }, [user, state.user.username, dispatch])

  return (
    <Style>
      <Popup
        trigger={
          <button className="Profile-center">
            <Avatar
              className="Profile-avatar"
              image={user && user.avatar_url}
            />
            <Heading color={COLOR.DARK} className="Profile-name" type="h4">
              {user && user.login}
            </Heading>
          </button>
        }
        position="bottom left"
      >
        <>
          <button>
            <a
              className="Profile-center"
              href={(user && user.html_url) || '#'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon icon="github" prefix="fab" size="sm" marginRight />
              <Heading color={COLOR.INHERIT} type="h5">
                View Github
              </Heading>
            </a>
          </button>
          <button
            className="Profile-center"
            onClick={setColorMode.bind(null, oppositeColorMode)}
          >
            <Icon icon="moon" size="sm" marginRight />
            <Heading color={COLOR.INHERIT} type="h5">
              Theme
            </Heading>
          </button>
        </>
      </Popup>
    </Style>
  )
}
