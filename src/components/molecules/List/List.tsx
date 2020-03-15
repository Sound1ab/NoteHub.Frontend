import React, { ReactNode } from 'react'

import { styled } from '../../../theme'

const Style = styled.div`
  position: relative;
`

interface IList<T extends { name: string }> {
  children: (props: T) => ReactNode
  items: T[]
}

export function List<T extends { name: string }>({
  items,
  children,
}: IList<T>) {
  return (
    <Style>
      {items
        ?.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
        .map(item => children(item))}
    </Style>
  )
}
