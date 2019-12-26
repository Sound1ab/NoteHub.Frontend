import React, { Dispatch, SetStateAction } from 'react'

import { styled } from '../../../theme'
import { Heading, Icon } from '../../atoms'

const Style = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;

  .NewRepo-heading {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: bold;
  }

  svg {
    color: ${({ theme }) => theme.colors.accent};
  }
`

interface INewRepo {
  setIsNewRepoOpen: Dispatch<SetStateAction<boolean>>
}

export function NewRepo({ setIsNewRepoOpen }: INewRepo) {
  function handleOnClick() {
    setIsNewRepoOpen(isNewRepoOpen => !isNewRepoOpen)
  }

  return (
    <Style onClick={handleOnClick}>
      <Icon size="sm" icon="plus-circle" prefix="fa" marginRight />
      <Heading className="NewRepo-heading" type="h4">
        New Repo
      </Heading>
    </Style>
  )
}
