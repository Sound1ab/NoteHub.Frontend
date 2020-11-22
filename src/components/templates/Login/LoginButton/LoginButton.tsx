import styled from 'styled-components'
import { Button } from '../../../atoms'

export const LoginButton = styled(Button)`
  padding: ${({ theme }) => theme.spacing.xs};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.company.github};
  border-radius: ${({ theme }) => theme.spacing.xxs};

  &:visited {
    color: #fff;
  }

  * svg {
    color: #fff;
  }
`
