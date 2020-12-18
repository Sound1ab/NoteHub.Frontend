import styled from 'styled-components'

import { Button } from '../../../atoms'
import { darken } from '../../../../utils'

export const LoginButton = styled(Button)`
  padding: ${({ theme }) => theme.spacing.xs};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  text-decoration: none;
  background-color: var(--company-github);
  border-radius: ${({ theme }) => theme.spacing.xxs};

  &:visited {
    color: #fff;
  }

  &:link {
    color: var(--white);
  }

  &:hover {
    background-color: ${darken('--company-github', 0.08)};
  }

  * svg {
    color: #fff;
  }
`
