import React from 'react'
import styled from 'styled-components'

import { useReadConfiguration } from '../../../../../hooks/configuration/useReadConfiguration'
import { Fade } from '../../../../animation/Mount/Fade'
import { ModalSwitch } from '../../../../utility/Switch/ModalSwitch'
import { ConnectRepoCard } from './Card/ConnectRepoCard'
import { RepoCard } from './Card/RepoCard'

export function Repos() {
  const { configuration, loading } = useReadConfiguration()

  return (
    <Fade show={!loading}>
      <>
        <h1>Repos</h1>
        <CardGrid>
          {configuration?.connectedRepos?.map((name) => (
            <RepoCard key={name} name={name} />
          ))}
          <ConnectRepoCard />
        </CardGrid>
        <ModalSwitch />
      </>
    </Fade>
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
