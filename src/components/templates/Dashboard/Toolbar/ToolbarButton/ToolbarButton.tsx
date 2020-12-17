import styled, { css } from 'styled-components'

import { darken } from '../../../../../utils'
import { Button } from '../../../../atoms'

export const ToolbarButton = styled(Button)`
  margin-right: ${({ theme }) => theme.spacing.xs};
  color: ${({ isActive }) =>
    isActive ? css`var(--accent-primary)` : css`var(--text-primary)`};

  &:hover {
    color: ${({ isActive }) =>
      isActive ? darken('--accent-primary', 0.05) : css`var(--text-secondary)`};
  }
`
