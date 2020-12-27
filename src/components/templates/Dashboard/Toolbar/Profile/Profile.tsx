import { useApolloClient } from '@apollo/client'
import React, { ReactNode, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import { useModalToggle } from '../../../../../hooks/utils/useModalToggle'
import { useProfileDropdown } from '../../../../../hooks/dropdown/useProfileDropdown'
import { useReadGithubUser } from '../../../../../hooks/user/useReadGithubUser'
import { Avatar } from '../../../../atoms/Avatar/Avatar'
import { Dropdown } from '../../../../atoms/Dropdown/Dropdown'
import { localState } from '../../../../providers/ApolloProvider/cache'

interface IProfile {
  children?: ReactNode
}

export function Profile(props: IProfile) {
  const client = useApolloClient()

  const containerRef = useRef(null)
  const user = useReadGithubUser()
  const { isOpen, Portal, ref, setOpen } = useModalToggle<HTMLUListElement>(
    containerRef
  )
  const { items, logout, called } = useProfileDropdown()

  if (called && logout === 'ok') {
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

  return (
    <Wrapper {...props} ref={containerRef}>
      <Avatar image={user?.avatar_url} onClick={handleOpen} />
      {isOpen && (
        <Portal>
          <Dropdown containerRef={ref} items={items} />
        </Portal>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
`
