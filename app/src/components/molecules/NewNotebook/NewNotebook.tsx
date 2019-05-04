import React, { useState } from 'react'
import { CreateNotebookModal } from '..'
import { COLOR } from '../../../enums'
import { styled } from '../../../theme'
import { Heading, Icon } from '../../atoms'

const Style = styled.div`
  .NewNotebook-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.s};
    cursor: pointer;
  }
`

export function NewNotebook() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Style>
      <span
        className="NewNotebook-wrapper"
        onClick={setIsModalOpen.bind(null, true)}
      >
        <Icon
          size="lg"
          color={COLOR.ACCENT}
          icon="plus-circle"
          prefix="fa"
          marginRight
        />
        <Heading color={COLOR.LIGHT} type="h3">
          New Notebook
        </Heading>
      </span>
      <CreateNotebookModal
        isOpen={isModalOpen}
        onRequestClose={setIsModalOpen.bind(null, false)}
      />
    </Style>
  )
}
