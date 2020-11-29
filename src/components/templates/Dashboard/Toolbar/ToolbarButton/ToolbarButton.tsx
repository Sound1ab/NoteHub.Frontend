import styled from 'styled-components'

import { Button } from '../../../../atoms'
import { darken } from 'polished'

export const ToolbarButton = styled(Button)`
  margin-right: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.accent : theme.colors.text.primary};

  &:hover {
    color: ${({ theme, isActive }) =>
      isActive
        ? darken(0.05, theme.colors.accent)
        : theme.colors.text.secondary};
  }
`
