import React from 'react'
import ContentLoader from 'react-content-loader'

import { styled } from '../../../theme'

const Style = styled.div`
  position: relative;
  height: 100%;
  overflow-y: auto;

  .NavigationItemSkeleton-content {
    width: 100%;
    height: 200px;
    background-color: transparent;
  }

  .NavigationItemSkeleton-rect {
    --rect-height: 8px;
    width: 100%;
    height: var(--rect-height);
    x: 0px;

    &:nth-child(1n) {
      y: 0;
    }

    &:nth-child(2n) {
      y: calc((var(--rect-height) * 1) + ${({ theme }) => theme.spacing.xxs});
    }

    &:nth-child(3n) {
      y: calc(
        (var(--rect-height) * 2) + (${({ theme }) => theme.spacing.xxs} * 2)
      );
    }
  }
`

export function NavigationItemSkeleton() {
  return (
    <Style aria-label="Loading repos">
      <ContentLoader className="NavigationItemSkeleton-content">
        <rect className="NavigationItemSkeleton-rect" />
        <rect className="NavigationItemSkeleton-rect" />
        <rect className="NavigationItemSkeleton-rect" />
      </ContentLoader>
    </Style>
  )
}
