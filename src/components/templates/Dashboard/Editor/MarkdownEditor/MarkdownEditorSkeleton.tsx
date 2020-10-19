import React from 'react'
import ContentLoader from 'react-content-loader'

import { styled } from '../../../../../theme'
import { colors } from '../../../../../theme/theme'
import { useReadCurrentTheme } from '../../../../../hooks'

export function MarkdownEditorSkeleton() {
  const currentTheme = useReadCurrentTheme()

  return (
    <Wrapper aria-label="Markdown loading">
      <StyledContentLoader
        className="MarkdownEditorSkeleton-content"
        backgroundColor={colors[currentTheme].background.secondary}
        foregroundColor={colors[currentTheme].background.tertiary}
      >
        <rect y="0" height="30" width="20%" />
        <rect y="40" height="15" width="60%" />
        <rect y="65" height="15" width="50%" />
        <rect y="90" height="15" width="55%" />
        <rect y="125" height="30" width="30%" />
        <rect y="165" height="15" width="40%" />
        <rect y="190" height="15" width="50%" />
        <rect y="215" height="15" width="60%" />
        <rect y="250" height="200" width="60%" />
        <rect y="470" height="30" width="10%" />
        <rect y="510" height="15" width="55%" />
        <rect y="535" height="15" width="20%" />
        <rect y="560" height="15" width="40%" />
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
