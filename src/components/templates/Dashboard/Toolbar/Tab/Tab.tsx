import React, { MouseEvent } from 'react'
import styled, { css } from 'styled-components'

import { useActivePath } from '../../../../../hooks/recoil/useActivePath'
import { useTabs } from '../../../../../hooks/recoil/useTabs'
import { getNextTab } from '../../../../../utils/getNextTab'
import { Button } from '../../../../atoms/Button/Button'
import { Close } from '../../../../atoms/Close/Close'

interface ITab {
  name: string
  path: string
  isDisabled: boolean
}

export function Tab({ name, path, isDisabled }: ITab) {
  const [activePath, setActivePath] = useActivePath()
  const [tabs, setTabs] = useTabs()
  const isActive = path === activePath

  function handleOnClick() {
    setActivePath(path)
  }

  function handleOnClose(e: MouseEvent<HTMLElement>) {
    e.stopPropagation()

    if (isActive) {
      const nextTab = getNextTab([...tabs], path)

      if (!nextTab) {
        setActivePath('')
      } else {
        setActivePath(nextTab)
      }
    }

    tabs.delete(path)

    setTabs(new Set(tabs))
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
