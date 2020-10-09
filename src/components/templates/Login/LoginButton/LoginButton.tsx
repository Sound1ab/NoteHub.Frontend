import { styled } from '../../../../theme'
import { Button } from '../../../atoms'

export const LoginButton = styled(Button)`
  padding: ${({ theme }) => theme.spacing.xs};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;

  &:visited {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  * svg {
    color: #fff;
  }
`
