import React from 'react'
import styled from 'styled-components'

import { Icon } from '../../../../../atoms/Icon/Icon'

export function Card() {
  return (
    <Wrapper>
      <HeadingWrapper>
        <StyledIcon icon="trash" />
        <StyledHeading>hey</StyledHeading>
      </HeadingWrapper>
      <InfoWrapper>
        <UpdateWrapper>
          <UpdatedBy />
          <UpdatedAt>last updated 12d</UpdatedAt>
        </UpdateWrapper>
        <LockIcon icon="code" />
      </InfoWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  border-radius: ${({ theme }) => theme.borderRadius};
  grid-gap: ${({ theme }) => theme.spacing.xs};
  background-color: var(--background-secondary);
  padding: ${({ theme }) => theme.spacing.xs};
  transition: ${({ theme }) => theme.transition};

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow};
  }
`

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const StyledIcon = styled(Icon)`
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

const LockIcon = styled(Icon)`
  color: var(--text-primary);
`
