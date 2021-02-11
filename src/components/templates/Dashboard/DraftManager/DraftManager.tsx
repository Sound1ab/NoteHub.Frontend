import { ReadCommitResult } from 'isomorphic-git'
import React, { useState } from 'react'
import styled from 'styled-components'

// import { useFs } from '../../../../hooks/fs/useFs'
import { useGit } from '../../../../hooks/git/useGit'
// import { useActivePath } from '../../../../hooks/recoil/useActivePath'
import { useCommittedChanges } from '../../../../hooks/recoil/useCommittedChanges'
// import { useFiles } from '../../../../hooks/recoil/useFiles'
import { useUnstagedChanges } from '../../../../hooks/recoil/useUnstagedChanges'
import { Fade } from '../../../animation/Mount/Fade'
import { Button } from '../../../atoms/Button/Button'
import { Icon } from '../../../atoms/Icon/Icon'

export function DraftManager() {
  const [unstagedChanges, setUnstagedChanges] = useUnstagedChanges()
  const [committedChanges, setCommittedChanges] = useCommittedChanges()
  const [
    {
      rollback,
      addAll,
      commit,
      getUnstagedChanges,
      push,
      getCommittedChanges,
      removeAll,
      getDeletedUnstagedChanges,
      getCommits,
    },
  ] = useGit()
  // const [{ readFile, readDirRecursive }] = useFs()
  // const [activePath] = useActivePath()
  // const [, setFiles] = useFiles()
  const [commits, setCommits] = useState<ReadCommitResult[]>([])
  const [loading, setLoading] = useState(false)
  const [isDiscarding, setIsDiscarding] = useState(false)

  async function handleDiscard() {
    setIsDiscarding(true)

    await rollback()

    setUnstagedChanges(await getUnstagedChanges())

    // setFiles(await readDirRecursive())

    // const content = await readFile(activePath)

    setCommittedChanges(await getCommittedChanges())

    // May unstage adding a new file so content could be undefined
    // if (content) {
    //   editor?.setValue(content)
    // }

    setIsDiscarding(false)
  }

  async function handleCommit() {
    setLoading(true)

    await removeAll(await getDeletedUnstagedChanges())

    await addAll(await getUnstagedChanges())

    await commit()

    setUnstagedChanges(await getUnstagedChanges())

    setCommittedChanges(await getCommittedChanges())

    // Get commits not pushed to remote
    setCommits(await getCommits())

    setLoading(false)
  }

  async function handlePush() {
    setLoading(true)

    await push()

    // Get files not pushed to remote
    setCommittedChanges(await getCommittedChanges())

    // Get commits not pushed to remote
    setCommits(await getCommits())

    setLoading(false)
  }

  const isPushReady =
    committedChanges.length > 0 && unstagedChanges.length === 0

  // TODO: Write tests
  return (
    <Fade show={unstagedChanges.length > 0 || loading || commits.length > 0}>
      <Wrapper>
        <Heading>
          {unstagedChanges.length} unstaged {commits.length} commits
        </Heading>
        <DiscardButton
          title="Discard local changes"
          onClick={handleDiscard}
          isDisabled={unstagedChanges.length === 0}
          isLoading={isDiscarding}
        >
          <Icon icon="times" size="lg" />
        </DiscardButton>
        {!isPushReady ? (
          <CommitButton
            title="Stage and commit changes"
            onClick={handleCommit}
            isLoading={loading}
          >
            <Icon icon="circle" size="lg" />
          </CommitButton>
        ) : (
          <PushButton
            title="Push changes to remote"
            onClick={handlePush}
            isLoading={loading}
          >
            <Icon icon="arrow-circle-up" size="lg" />
          </PushButton>
        )}
      </Wrapper>
    </Fade>
  )
}

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xs};
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: var(--background-secondary);
  border-radius: ${({ theme }) => theme.borderRadius};
  margin: ${({ theme }) => theme.spacing.xs};
  z-index: 20;

  * + * {
    margin-left: ${({ theme }) => theme.spacing.xs};
  }
`

const StyledButton = styled(Button)`
  border-radius: 50%;
  width: ${({ theme }) => theme.spacing.m};
  height: ${({ theme }) => theme.spacing.m};
  display: flex;
  justify-content: center;
  align-items: center;

  > * {
    color: var(--white);
  }
`

const DiscardButton = styled(StyledButton)`
  background-color: var(--text-tertiary);
`

const CommitButton = styled(StyledButton)`
  background-color: var(--feedback-info) !important;
`

const PushButton = styled(StyledButton)`
  background-color: var(--accent-primary) !important;
`

const Heading = styled.h6`
  margin: 0;
`
