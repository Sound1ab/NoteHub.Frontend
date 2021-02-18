import React from 'react'
import styled from 'styled-components'

import { Card } from './Card/Card'

export function Repos() {
  return (
    <>
      <h1>Repos</h1>
      <CardGrid>
        <Card />
        <Card />
        <Card />
      </CardGrid>
    </>
  )
}

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(calc(${({ theme }) => theme.spacing.xxl} * 2), 1fr)
  );
  grid-gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
`
