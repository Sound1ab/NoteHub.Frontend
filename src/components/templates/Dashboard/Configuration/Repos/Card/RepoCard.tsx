import React from 'react'
import styled from 'styled-components'

import { useRepo } from '../../../../../../hooks/recoil/useRepo'
import { useReadRepo } from '../../../../../../hooks/repo/useReadRepo'
import { useReadGithubUser } from '../../../../../../hooks/user/useReadGithubUser'
import { daysFromEvent } from '../../../../../../utils/daysFromEvent'
import { Fade } from '../../../../../animation/Mount/Fade'
import { Icon } from '../../../../../atoms/Icon/Icon'
import { Card } from './Card'

interface ICard {
  name: string
}

export function RepoCard({ name }: ICard) {
  const { repo, loading: repoLoading } = useReadRepo(name)
  const { user, loading: userLoading } = useReadGithubUser()
  const [, setRepo] = useRepo()

  function handleClick() {
    const login = user?.login

    setRepo(`${login}/${name}`)
  }

  return (
    <Fade show={!repoLoading && !userLoading}>
      <Card onClick={handleClick}>
        <HeadingWrapper>
          <RepoIcon icon="github" prefix="fab" />
          <StyledHeading>{repo?.name}</StyledHeading>
        </HeadingWrapper>
        <InfoWrapper>
          <UpdateWrapper>
            <UpdatedBy />
            <UpdatedAt>
              last updated {daysFromEvent(repo?.updated_at)}d
            </UpdatedAt>
          </UpdateWrapper>
          {repo?.private ? (
            <StyledIcon icon="lock" />
          ) : (
            <StyledIcon icon="unlock" />
          )}
        </InfoWrapper>
      </Card>
    </Fade>
  )
}

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const RepoIcon = styled(Icon)`
  background-color: pink;
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

const UpdateWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const UpdatedBy = styled.div`
  width: ${({ theme }) => theme.spacing.s};
  height: ${({ theme }) => theme.spacing.s};
  background-color: var(--accent-primary);
  border-radius: 50%;
  margin-right: ${({ theme }) => theme.spacing.xs};
`

const UpdatedAt = styled.h6`
  margin-bottom: 0;
`

const StyledIcon = styled(Icon)`
  color: var(--text-primary);
`
