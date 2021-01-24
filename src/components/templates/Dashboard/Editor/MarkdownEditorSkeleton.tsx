import React from 'react'
import ContentLoader from 'react-content-loader'
import styled from 'styled-components'

import { useFullWidth } from '../../../../hooks/recoil/theme/useFullWidth'
import { getCssVariable } from '../../../../utils/css/getCssVariable'

export function MarkdownEditorSkeleton() {
  const [fullWidth] = useFullWidth()

  return (
    <Wrapper aria-label="Markdown loading">
      <StyledContentLoader
        fullWidth={fullWidth}
        className="MarkdownEditorSkeleton-content"
        backgroundColor={getCssVariable('--background-secondary')}
        foregroundColor={getCssVariable('--background-tertiary')}
      >
        <rect y="0" height="30" width="50%" rx="8" ry="8" />
        <rect y="40" height="15" width="100%" rx="8" ry="8" />
        <rect y="65" height="15" width="100%" rx="8" ry="8" />
        <rect y="90" height="15" width="85%" rx="8" ry="8" />
        <rect y="125" height="30" width="40%" rx="8" ry="8" />
        <rect y="165" height="15" width="100%" rx="8" ry="8" />
        <rect y="190" height="15" width="100%" rx="8" ry="8" />
        <rect y="215" height="15" width="60%" rx="8" ry="8" />
        <rect y="250" height="200" width="100%" rx="8" ry="8" />
        <rect y="470" height="30" width="80%" rx="8" ry="8" />
        <rect y="510" height="15" width="100%" rx="8" ry="8" />
        <rect y="535" height="15" width="100%" rx="8" ry="8" />
        <rect y="560" height="15" width="40%" rx="8" ry="8" />
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
  display: flex;
  justify-content: center;
`

const StyledContentLoader = styled(ContentLoader)<{ fullWidth: boolean }>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '90ch')};
  height: 100%;
  background-color: transparent;
`
