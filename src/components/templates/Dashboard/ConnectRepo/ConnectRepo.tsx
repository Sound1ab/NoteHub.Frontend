import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useReadConfiguration } from '../../../../hooks/configuration/useReadConfiguration'
import { useUpdateConfiguration } from '../../../../hooks/configuration/useUpdateConfiguration'
import { useListRepos } from '../../../../hooks/repo/useListRepos'
import { RegularButton } from '../../../atoms/Button/Button'
import { Modal } from '../../../atoms/Modal/Modal'
import { Portal } from '../../../atoms/Portal/Portal'
import { SearchInput } from '../../../atoms/SearchInput/SearchInput'
import { SearchResults } from '../../../atoms/SearchResults/SearchResults'
import { Spinner } from '../../../atoms/Spinner/Spinner'
import { ErrorToast } from '../../../atoms/Toast/Toast'
import { Row } from './Row/Row'

export function ConnectRepo() {
  const navigate = useNavigate()
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
    } finally {
      handleCancel()
    }
  }

  function handleCancel() {
    navigate(-1)
  }

  return (
    <Portal hasBackground={true} setOpen={handleCancel} hasClickLayer={false}>
      <StyledModal>
        <h2>Link your GitHub repository</h2>
        <StyledSearchInput search={search} setSearch={setSearch} />
        <ResultsWrapper>
          {loading ? (
            <Spinner />
          ) : (
            <SearchResults<{ name: string; full_name: string }>
              search={search}
              data={repos}
              keys={['name']}
            >
              {(results) =>
                results.map(({ item: { name, full_name } }) => (
                  <Row
                    key={name}
                    name={name}
                    fullName={full_name}
                    onClick={handleRowClick}
                    isSelected={name === selectedRepo}
                    isConnected={connectedRepos.includes(name)}
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
      </StyledModal>
    </Portal>
  )
}

const StyledModal = styled(Modal)`
  width: 100%;
  max-width: 70ch;
  height: 100%;
  max-height: 58ch;
  padding: ${({ theme }) => theme.spacing.l};
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
