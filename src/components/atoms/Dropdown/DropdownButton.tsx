import styled, { css } from 'styled-components'

import { Button } from '../Button/Button'

export const DropdownButton = styled(Button)<{ isDisabled: boolean }>`
  background-color: var(--background-secondary);
  user-select: none;
  outline: none;
  padding: ${({ theme }) => theme.spacing.xxs}
    ${({ theme }) => theme.spacing.xs};
  width: 100%;
  color: var(--text-primary);
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      cursor: not-allowed;
    `}

  &:hover {
    background-color: var(--background-tertiary);
  }
`
