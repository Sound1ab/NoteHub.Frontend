import React, { useState } from 'react'
import { CreateRepoModal } from '..'
import { styled } from '../../../theme'
import { Heading, Icon } from '../../atoms'

const Style = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  
  .NewRepo-heading {
    color: ${({theme}) => theme.colors.text.primary}
  }

  svg {
    color: ${({ theme }) => theme.colors.accent};
  }
`

export function NewRepo() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Style onClick={setIsModalOpen.bind(null, true)}>
      <>
        <Icon size="sm" icon="plus-circle" prefix="fa" marginRight />
        <Heading className="NewRepo-heading" type="h4">New Repo</Heading>
      </>
      <CreateRepoModal
        isOpen={isModalOpen}
        onRequestClose={setIsModalOpen.bind(null, false)}
      />
    </Style>
  )
}
