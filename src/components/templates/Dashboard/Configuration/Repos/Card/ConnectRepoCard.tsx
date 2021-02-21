import React from 'react'
import styled from 'styled-components'

import { Icon } from '../../../../../atoms/Icon/Icon'
import { Card } from './Card'
import { Link, useRouteMatch } from 'react-router-dom'

export function ConnectRepoCard() {
  const { url } = useRouteMatch()

  return (
    <Link to={`${url}/connect-repo`}>
      <Card>
        <HeadingWrapper>
          <RepoIcon icon="plus-circle" />
          <StyledHeading>Connect a repo</StyledHeading>
        </HeadingWrapper>
        <InfoWrapper>
          <Copy>Connect a repo to sync notes to GitHub</Copy>
        </InfoWrapper>
      </Card>
    </Link>
  )
}

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const RepoIcon = styled(Icon)`
  background-color: var(--text-primary);
  padding: ${({ theme }) => theme.spacing.s};
  border-radius: 2px;
  margin-right: ${({ theme }) => theme.spacing.xs};
`

const StyledHeading = styled.h3`
  margin-bottom: 0;
`

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Copy = styled.h6`
  margin-bottom: 0;
`
