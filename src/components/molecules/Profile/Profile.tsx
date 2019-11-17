import React from 'react'
import { useReadGithubUser } from '../../../hooks/user/useReadGithubUser'
import { styled } from '../../../theme'
import { Avatar } from '../../atoms'

const Style = styled.div`
  display: flex;

  .Profile-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export function Profile() {
  const user = useReadGithubUser()

  return (
    <Style>
      <Avatar image={user?.avatar_url} />
    </Style>
  )
}
