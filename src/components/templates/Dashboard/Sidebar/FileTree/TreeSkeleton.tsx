import React from 'react'
import ContentLoader from 'react-content-loader'
import styled from 'styled-components'

import { getCssVariable } from '../../../../../utils/css/getCssVariable'

export function TreeSkeleton() {
  return (
    <Wrapper aria-label="Markdown loading">
      <StyledContentLoader
        backgroundColor={getCssVariable('--background-secondary')}
        foregroundColor={getCssVariable('--background-tertiary')}
      >
        <rect y="0" height="30" width="75%" rx="8" ry="8" />
        <rect y="0" x="80%" height="30" width="20%" rx="8" ry="8" />
        <rect y="40" x="20%" height="30" width="55%" rx="8" ry="8" />
        <rect y="40" x="80%" height="30" width="20%" rx="8" ry="8" />
        <rect y="80" x="20%" height="30" width="55%" rx="8" ry="8" />
        <rect y="80" x="80%" height="30" width="20%" rx="8" ry="8" />
        <rect y="120" height="30" width="75%" rx="8" ry="8" />
        <rect y="120" x="80%" height="30" width="20%" rx="8" ry="8" />
        <rect y="160" x="20%" height="30" width="55%" rx="8" ry="8" />
        <rect y="160" x="80%" height="30" width="20%" rx="8" ry="8" />
        <rect y="200" x="40%" height="30" width="35%" rx="8" ry="8" />
        <rect y="200" x="80%" height="30" width="20%" rx="8" ry="8" />
        <rect y="240" x="40%" height="30" width="35%" rx="8" ry="8" />
        <rect y="240" x="80%" height="30" width="20%" rx="8" ry="8" />
        <rect y="280" x="20%" height="30" width="55%" rx="8" ry="8" />
        <rect y="280" x="80%" height="30" width="20%" rx="8" ry="8" />
        <rect y="320" height="30" width="75%" rx="8" ry="8" />
        <rect y="320" x="80%" height="30" width="20%" rx="8" ry="8" />
        <rect y="360" x="20%" height="30" width="55%" rx="8" ry="8" />
        <rect y="360" x="80%" height="30" width="20%" rx="8" ry="8" />
        <rect y="400" x="20%" height="30" width="55%" rx="8" ry="8" />
        <rect y="400" x="80%" height="30" width="20%" rx="8" ry="8" />
        <rect y="440" x="40%" height="30" width="35%" rx="8" ry="8" />
        <rect y="440" x="80%" height="30" width="20%" rx="8" ry="8" />
        <rect y="480" x="40%" height="30" width="35%" rx="8" ry="8" />
        <rect y="480" x="80%" height="30" width="20%" rx="8" ry="8" />
        <rect y="520" height="30" width="75%" rx="8" ry="8" />
        <rect y="520" x="80%" height="30" width="20%" rx="8" ry="8" />
        <rect y="560" x="20%" height="30" width="55%" rx="8" ry="8" />
        <rect y="560" x="80%" height="30" width="20%" rx="8" ry="8" />8
      </StyledContentLoader>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  grid-area: editor;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.xs};
  overflow-x: hidden;
`

const StyledContentLoader = styled(ContentLoader)`
  width: 100%;
  height: 100%;
  background-color: transparent;
`
