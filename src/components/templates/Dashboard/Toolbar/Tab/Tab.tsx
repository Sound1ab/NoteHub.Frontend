import React, { MouseEvent } from 'react'
import styled, { css } from 'styled-components'

import { useReadCurrentPath, useReadTabs } from '../../../../../hooks'
import { Button, Icon } from '../../../../atoms'
import { localState } from '../../../../providers/ApolloProvider/cache'

interface ITab {
  name: string
  path: string
}

export function Tab({ name, path }: ITab) {
  const currentPath = useReadCurrentPath()
  const tabs = useReadTabs()
  const isActive = path === currentPath

  function handleOnClick() {
    localState.currentPathVar(path)
  }

  function getNextTab(tabs: string[], tab: string) {
    const index = tabs.findIndex((nextTab) => nextTab === tab)

    const leftTab = tabs[index - 1]
    const rightTab = tabs[index + 1]

    return leftTab || rightTab || undefined
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
    <Wrapper onClick={handleOnClick} isActive={isActive} title={path}>
      <Heading>{name}</Heading>
      <Close icon="times" size="1x" onClick={handleOnClose} title="close" />
    </Wrapper>
  )
}

const Wrapper = styled(Button)<{ isActive: boolean }>`
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

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      background-color: var(--background-tertiary);
    }
  }
`

const Heading = styled.h5`
  margin-bottom: 0;
  white-space: nowrap;
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