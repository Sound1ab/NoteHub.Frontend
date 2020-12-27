import styled from 'styled-components'

import { Button } from '../Button/Button'

export const DropdownButton = styled(Button)`
  user-select: none;
  outline: none;
  padding: ${({ theme }) => theme.spacing.xxs}
    ${({ theme }) => theme.spacing.xs};
  width: 100%;
  color: var(--text-primary);

  &:hover {
    background-color: var(--background-tertiary);
  }
`
