import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { useReadConfiguration } from '../../../../hooks/configuration/useReadConfiguration'
import { useUpdateConfiguration } from '../../../../hooks/configuration/useUpdateConfiguration'
import { useListRepos } from '../../../../hooks/repo/useListRepos'
import { RegularButton } from '../../../atoms/Button/Button'
import { Portal } from '../../../atoms/Portal/Portal'
import { SearchInput } from '../../../atoms/SearchInput/SearchInput'
import { SearchResults } from '../../../atoms/SearchResults/SearchResults'
import { Spinner } from '../../../atoms/Spinner/Spinner'
import { ErrorToast } from '../../../atoms/Toast/Toast'
import { Row } from './Row/Row'

export function ConnectRepo() {
  const { goBack } = useHistory()
  const [updateConfiguration] = useUpdateConfiguration()
  const { configuration } = useReadConfiguration()
  const [selectedRepo, setSelectedRepo] = useState('')
  const [search, setSearch] = useState('')
  const { repos, loading } = useListRepos()

  const connectedRepos = configuration?.connectedRepos ?? []

  function handleRowClick(repo: string) {
    setSelectedRepo(repo)
  }

  async function handleConnect() {
    if (!selectedRepo) return

    if (!configuration) {
      ErrorToast('There was a problem connecting')
      handleCancel()
      return
    }

    try {
      await updateConfiguration({
        ...configuration,
        connectedRepos: [...connectedRepos, selectedRepo],
      })
    } catch {
      ErrorToast('There was a problem connecting')
    }
  }

  function handleCancel() {
    goBack()
  }

  return (
    <Portal hasBackground={true} setOpen={handleCancel} hasClickLayer={false}>
      <Modal>
        <h2>Link your GitHub repository</h2>
        <StyledSearchInput search={search} setSearch={setSearch} />
        <ResultsWrapper>
          {loading ? (
            <Spinner />
          ) : (
            <SearchResults<{ full_name: string }>
              search={search}
              data={repos}
              keys={['full_name']}
            >
              {(results) =>
                results.map(({ item: { full_name } }) => (
                  <Row
                    key={full_name}
                    name={full_name}
                    onClick={handleRowClick}
                    isSelected={full_name === selectedRepo}
                    isConnected={connectedRepos.includes(full_name)}
                  />
                ))
              }
            </SearchResults>
          )}
        </ResultsWrapper>
        <ButtonWrapper>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
          <ConnectButton isDisabled={!selectedRepo} onClick={handleConnect}>
            Connect
          </ConnectButton>
        </ButtonWrapper>
      </Modal>
    </Portal>
  )
}

const Modal = styled.div`
  width: 100%;
  max-width: 70ch;
  height: 100%;
  max-height: 58ch;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: var(--background-primary);
  padding: ${({ theme }) => theme.spacing.l};
  display: flex;
  flex-direction: column;
`

const StyledSearchInput = styled(SearchInput)`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const ResultsWrapper = styled.div`
  border: 1px solid var(--accent-primary);
  overflow: scroll;
  flex: 1;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const CancelButton = styled(RegularButton)`
  background-color: var(--feedback-error);
  color: var(--white);
`

const ConnectButton = styled(RegularButton)`
  background-color: var(--feedback-success);
  color: var(--white);
`
