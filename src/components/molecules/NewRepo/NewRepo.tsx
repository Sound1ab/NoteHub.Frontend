import React from 'react'

import { useCommand } from '../../../hooks'
import { styled } from '../../../theme'
import { Heading, Icon } from '../../atoms'

const Style = styled.div`
  flex: 0 1 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};

  .NewRepo-heading {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: bold;
  }

  svg {
    color: ${({ theme }) => theme.colors.accent};
  }
`

export function NewRepo() {
  const { handleSetIsNewRepoOpen } = useCommand()

  return (
    <Style onClick={() => handleSetIsNewRepoOpen()}>
      <Icon size="sm" icon="plus-circle" prefix="fa" marginRight />
      <Heading className="NewRepo-heading" type="h4">
        New Repo
      </Heading>
    </Style>
  )
}
