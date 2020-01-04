import React from 'react'
import ContentLoader from 'react-content-loader'

import { styled } from '../../../theme'

const Style = styled.div`
  position: relative;
  grid-area: editor;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.xs};
  overflow-x: hidden;

  .MarkdownEditorSkeleton-content {
    width: 100%;
    height: 300px;
    background-color: transparent;
  }
`

export function MarkdownEditorSkeleton() {
  return (
    <Style>
      <ContentLoader className="MarkdownEditorSkeleton-content">
        <rect y="0" height="18" width="100%" />
        <rect y="23" height="8" width="100%" />
        <rect y="36" height="8" width="50%" />
        <rect y="54" height="12" width="100%" />
        <rect y="71" height="8" width="100%" />
        <rect y="84" height="8" width="80%" />
        <rect y="102" height="100" width="100%" />
      </ContentLoader>
    </Style>
  )
}
