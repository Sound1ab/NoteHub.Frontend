import React from 'react'
import styled from 'styled-components'

import { Icon } from '../../../../atoms/Icon/Icon'

interface IRow {
  name: string
  fullName: string
  onClick: (name: string) => void
  isSelected: boolean
  isConnected: boolean
}

export function Row({
  name,
  fullName,
  onClick,
  isSelected,
  isConnected,
}: IRow) {
  function handleClick() {
    if (isConnected) return

    onClick(name)
  }

  return (
    <Wrapper key={fullName} onClick={handleClick}>
      <RepoHeading>{fullName}</RepoHeading>
      {isSelected && !isConnected && <TickIcon icon="check" size="1x" />}
      {isConnected && <IsConnectedHeading>Connected</IsConnectedHeading>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.xs};
  border-bottom: var(--accent-primary) solid 1px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const RepoHeading = styled.h4`
  margin-bottom: 0;
`

const TickIcon = styled(Icon)`
  color: var(--feedback-success);
`

const IsConnectedHeading = styled.h5`
  margin-bottom: 0;
`
