import { styled } from '../../../../../theme'
import { Button } from '../../../../atoms'

export const ToolbarButton = styled(Button)`
  padding: 0.785rem;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.spacing.xxs};
  display: none;
  margin-right: ${({ theme }) => theme.spacing.xxs};
  color: ${({ theme }) => theme.colors.text.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: inline-flex;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
  }
`
