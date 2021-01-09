import React from 'react'
import styled from 'styled-components'

import { useFs } from '../../../../hooks/fs/useFs'
import { useGit } from '../../../../hooks/git/useGit'
import { useActivePath } from '../../../../hooks/recoil/useActivePath'
import { useCommittedChanges } from '../../../../hooks/recoil/useCommittedChanges'
import { useFileContent } from '../../../../hooks/recoil/useFileContent'
import { useUnstagedChanges } from '../../../../hooks/recoil/useUnstagedChanges'
import { Button } from '../../../atoms/Button/Button'
import { Icon } from '../../../atoms/Icon/Icon'

export function DraftManager() {
  const [unstagedChanges, setUnstagedChanges] = useUnstagedChanges()
  const [committedChanges, setCommittedChanges] = useCommittedChanges()
  const [
    {
      rollback,
      stageChanges,
      commit,
      getUnstagedChanges,
      push,
      getCommittedChanges,
    },
  ] = useGit()
  const [, setFileContent] = useFileContent()
  const [{ readFile }] = useFs()
  const [activePath] = useActivePath()

  console.log('unstagedChanges', unstagedChanges)

  if (unstagedChanges.length === 0 && committedChanges.length === 0) {
    return null
  }

  async function handleDiscard() {
    await rollback?.(unstagedChanges)

    setUnstagedChanges(await getUnstagedChanges?.())

    setFileContent((await readFile?.(activePath)) ?? '')
  }

  async function handleCommit() {
    await stageChanges?.(unstagedChanges)

    await commit?.()

    const test = await getUnstagedChanges?.()

    console.log('unstaged', test)

    setUnstagedChanges(test)

    const test2 = await getCommittedChanges?.()

    console.log('committedd', test2)
    setCommittedChanges(test2)
  }

  async function handlePush() {
    await push?.()

    setCommittedChanges(await getCommittedChanges?.())
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
