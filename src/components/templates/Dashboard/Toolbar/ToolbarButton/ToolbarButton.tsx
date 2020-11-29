import styled from 'styled-components'

import { Button } from '../../../../atoms'

export const ToolbarButton = styled(Button)`
  margin-right: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.accent : theme.colors.text.primary};

  &:hover {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`
