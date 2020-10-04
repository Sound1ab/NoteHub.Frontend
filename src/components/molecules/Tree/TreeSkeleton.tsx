import React from 'react'
import ContentLoader from 'react-content-loader'

import { useReadCurrentTheme } from '../../../hooks'
import { styled } from '../../../theme'
import { colors } from '../../../theme/theme'

export function TreeSkeleton() {
  const { currentTheme } = useReadCurrentTheme()

  return (
    <Wrapper aria-label="Markdown loading">
      <StyledContentLoader
        backgroundColor={colors[currentTheme].background.secondary}
        foregroundColor={colors[currentTheme].background.tertiary}
      >
        <rect y="0" height="35" width="100%" />

        <rect y="50" height="30" width="75%" />
        <rect y="50" x="80%" height="30" width="20%" />
        <rect y="90" x="20%" height="30" width="55%" />
        <rect y="90" x="80%" height="30" width="20%" />
        <rect y="130" x="20%" height="30" width="55%" />
        <rect y="130" x="80%" height="30" width="20%" />

        <rect y="170" height="30" width="75%" />
        <rect y="170" x="80%" height="30" width="20%" />
        <rect y="210" x="20%" height="30" width="55%" />
        <rect y="210" x="80%" height="30" width="20%" />
        <rect y="250" x="40%" height="30" width="35%" />
        <rect y="250" x="80%" height="30" width="20%" />
        <rect y="290" x="40%" height="30" width="35%" />
        <rect y="290" x="80%" height="30" width="20%" />
        <rect y="330" x="20%" height="30" width="55%" />
        <rect y="330" x="80%" height="30" width="20%" />

        <rect y="370" height="30" width="75%" />
        <rect y="370" x="80%" height="30" width="20%" />
        <rect y="410" x="20%" height="30" width="55%" />
        <rect y="410" x="80%" height="30" width="20%" />
        <rect y="450" x="20%" height="30" width="55%" />
        <rect y="450" x="80%" height="30" width="20%" />
        <rect y="490" x="40%" height="30" width="35%" />
        <rect y="490" x="80%" height="30" width="20%" />
        <rect y="530" x="40%" height="30" width="35%" />
        <rect y="530" x="80%" height="30" width="20%" />

        <rect y="570" height="30" width="75%" />
        <rect y="570" x="80%" height="30" width="20%" />
        <rect y="610" x="20%" height="30" width="55%" />
        <rect y="610" x="80%" height="30" width="20%" />
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
