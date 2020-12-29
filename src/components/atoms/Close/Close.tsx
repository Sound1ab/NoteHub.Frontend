import styled from 'styled-components'

import { Icon } from '../Icon/Icon'

export const Close = styled(Icon)`
  color: var(--text-secondary);
  margin-left: ${({ theme }) => theme.spacing.xxs};
  cursor: pointer;

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      background-color: var(--background-quaternary);
    }
  }
`
