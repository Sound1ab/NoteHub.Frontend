import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ModalSwitch } from '../../../../utility/Switch/ModalSwitch'
import { Card } from './Card/Card'

export function Repos() {
  const { url } = useRouteMatch()

  return (
    <>
      <h1>Repos</h1>
      <CardGrid>
        <Card />
        <Card />
        <Card />
        <Link to={`${url}/connect-repo`}>click</Link>
      </CardGrid>
      <ModalSwitch />
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
