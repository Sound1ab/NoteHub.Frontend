import React, { useContext } from 'react'
import styled from 'styled-components'

import { useFs } from '../../../../hooks/fs/useFs'
import { useGit } from '../../../../hooks/git/useGit'
import { useActivePath } from '../../../../hooks/recoil/useActivePath'
import { useCommittedChanges } from '../../../../hooks/recoil/useCommittedChanges'
import { useFiles } from '../../../../hooks/recoil/useFiles'
import { useUnstagedChanges } from '../../../../hooks/recoil/useUnstagedChanges'
import { Button } from '../../../atoms/Button/Button'
import { Icon } from '../../../atoms/Icon/Icon'
import { CodeMirrorContext } from '../CodeMirror/CodeMirror'

export function DraftManager() {
  const { editor } = useContext(CodeMirrorContext)
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
    },
  ] = useGit()
  const [{ readFile, readDirRecursive }] = useFs()
  const [activePath] = useActivePath()
  const [, setFiles] = useFiles()

  if (unstagedChanges.length === 0 && committedChanges.length === 0) {
    return null
  }

  async function handleDiscard() {
    await rollback(await getUnstagedChanges())

    setUnstagedChanges(await getUnstagedChanges())

    setFiles(await readDirRecursive())

    const content = await readFile(activePath)

    // May unstage adding a new file so content could be undefined
    if (content) {
      editor?.setValue(content)
    }
  }

  async function handleCommit() {
    await removeAll(await getDeletedUnstagedChanges())

    await addAll(await getUnstagedChanges())

    await commit()

    setUnstagedChanges(await getUnstagedChanges())

    setCommittedChanges(await getCommittedChanges())
  }

  async function handlePush() {
    await push()

    setCommittedChanges(await getCommittedChanges())
  }

  return (
    <Wrapper>
      <DiscardButton title="Discard local changes" onClick={handleDiscard}>
        <Icon icon="times" size="lg" />
      </DiscardButton>
      {unstagedChanges.length > 0 && (
        <CommitButton title="Stage and commit changes" onClick={handleCommit}>
          <Icon icon="circle" size="lg" />
        </CommitButton>
      )}
      {committedChanges.length > 0 && (
        <PushButton title="Push changes to remote" onClick={handlePush}>
          <Icon icon="check-circle" size="lg" />
        </PushButton>
      )}
    </Wrapper>
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
  border-radius: ${({ theme }) => theme.spacing.xxs};
  margin: ${({ theme }) => theme.spacing.xs};
  z-index: 20;

  button + button {
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
  background-color: var(--feedback-error);
`

const CommitButton = styled(StyledButton)`
  background-color: var(--feedback-info);
`

const PushButton = styled(StyledButton)`
  background-color: var(--feedback-success);
`
