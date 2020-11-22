import styled from 'styled-components'
import { Button } from '..'

export const DropdownButton = styled(Button)`
  user-select: none;
  outline: none;
  padding: ${({ theme }) => theme.spacing.xxs}
    ${({ theme }) => theme.spacing.xs};
  width: 100%;
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
  }
`
