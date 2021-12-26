import React from 'react'
import ContentLoader from 'react-content-loader'
import styled from 'styled-components'

import { getCssVariable } from '../../../../../../../utils/css/getCssVariable'

export function FileSkeleton() {
  return (
    <Wrapper aria-label="Markdown loading">
      <StyledContentLoader
        backgroundColor={getCssVariable('--background-secondary')}
        foregroundColor={getCssVariable('--background-tertiary')}
      >
        <rect y="0" height="30" width="75%" rx="8" ry="8" />
        <rect y="0" x="80%" height="30" width="20%" rx="8" ry="8" />
      </StyledContentLoader>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  grid-area: editor;
  height: 57px;
  padding: ${({ theme }) => theme.spacing.xs};
  overflow-x: hidden;
`

const StyledContentLoader = styled(ContentLoader)`
  width: 100%;
  height: 100%;
  background-color: transparent;
`
