import React from 'react'
import ContentLoader from 'react-content-loader'

import { styled } from '../../../theme'

const Style = styled.div`
  padding: ${({ theme }) => theme.spacing.xs};

  .CardSkeleton-content {
    width: 100%;
    height: 200px;
    background-color: transparent;
  }
`

export function CardSkeleton() {
  return (
    <Style>
      <ContentLoader className="CardSkeleton-content">
        <rect y="0" height="18" width="100%" />
        <rect y="23" height="18" width="100%" />
        <rect y="46" height="18" width="100%" />
      </ContentLoader>
    </Style>
  )
}
