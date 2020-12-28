import React, { MouseEvent } from 'react'
import styled, { css } from 'styled-components'

import { useReadCurrentPath } from '../../../../../hooks/localState/useReadCurrentPath'
import { useReadTabs } from '../../../../../hooks/localState/useReadTabs'
import { getNextTab } from '../../../../../utils/getNextTab'
import { Button } from '../../../../atoms/Button/Button'
import { Icon } from '../../../../atoms/Icon/Icon'
import { localState } from '../../../../providers/ApolloProvider/cache'

interface ITab {
  name: string
  path: string
  isDisabled: boolean
}

export function Tab({ name, path, isDisabled }: ITab) {
  const currentPath = useReadCurrentPath()
  const tabs = useReadTabs()
  const isActive = path === currentPath

  function handleOnClick() {
    localState.currentPathVar(path)
  }

  function handleOnClose(e: MouseEvent<HTMLElement>) {
    e.stopPropagation()

    if (isActive) {
      const nextTab = getNextTab([...tabs], path)

      if (!nextTab) {
        localState.currentPathVar('')
      } else {
        localState.currentPathVar(nextTab)
      }
    }
    tabs.delete(path)

    localState.tabsVar(new Set(tabs))
  }

  return (
    <Wrapper
      onClick={handleOnClick}
      isActive={isActive}
      title={path}
      isDisabled={isDisabled}
    >
      <Heading isDisabled={isDisabled}>{name}</Heading>
      <Close icon="times" size="1x" onClick={handleOnClose} title="close" />
    </Wrapper>
  )
}

const Wrapper = styled(Button)<{ isActive: boolean; isDisabled: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xs};
  ${({ isActive }) =>
    isActive &&
    css`
      background-color: var(--background-secondary);
    `};
  ${({ isActive, theme }) =>
    isActive &&
    css`
      box-shadow: inset 0px -${theme.spacing.xxxs} 0px 0px var(--accent-primary);
    `};
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      background-color: var(--background-tertiary);
    }
  }
`

const Heading = styled.h5<{ isDisabled: boolean }>`
  margin-bottom: 0;
  white-space: nowrap;
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      color: var(--text-secondary);
    `};
`

const Close = styled(Icon)`
  color: var(--text-secondary);
  margin-left: ${({ theme }) => theme.spacing.xxs};

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      background-color: var(--background-quaternary);
    }
  }
`
