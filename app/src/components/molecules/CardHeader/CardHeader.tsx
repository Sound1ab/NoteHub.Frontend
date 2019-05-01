import React, { useState } from 'react'
import { DeleteNotebookModal } from '..'
import { COLOR } from '../../../enums'
import { useStore } from '../../../hooks/useStore'
import { styled } from '../../../theme'
import { Heading, Icon } from '../../atoms'
import { CreateNoteModal } from '../ConfirmationModals/CreateNoteModal'

const Style = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.s};
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text.secondary};

  .CardHeader-options {
    cursor: pointer;
    display: flex;
    align-items: center;
    div + div {
      margin-left: ${({ theme }) => theme.spacing.xs};
    }
  }

  .CardHeader-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .CardHeader-new-note {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`

interface ICardHeader {
  title?: string | null
}

export function CardHeader({ title = '' }: ICardHeader) {
  const [state] = useStore()
  const [isCreateNoteModalOpen, setIsCreateNoteModalOpen] = useState(false)
  const [isDeleteNotebookModalOpen, setIsDeleteNotebookModalOpen] = useState(
    false
  )

  return (
    <Style>
      <Heading type="h2" marginBottom>
        {title}
      </Heading>
      <div className="CardHeader-wrapper">
        <div
          className="CardHeader-new-note"
          onClick={setIsCreateNoteModalOpen.bind(null, true)}
        >
          <Icon
            size="lg"
            color={COLOR.ACCENT}
            icon="plus-circle"
            prefix="fa"
            marginRight
          />
          <Heading color={COLOR.DARK} type="h3">
            New Note
          </Heading>
        </div>
        <div className="CardHeader-options">
          <Icon color={COLOR.MEDIUM} icon="sync" prefix="fa" size="sm" />
          <Icon
            color={COLOR.MEDIUM}
            icon="trash"
            prefix="fa"
            size="sm"
            onClick={setIsDeleteNotebookModalOpen.bind(null, true)}
          />
        </div>
      </div>
      <CreateNoteModal
        isOpen={isCreateNoteModalOpen}
        onRequestClose={setIsCreateNoteModalOpen.bind(null, false)}
        activeNotebook={state.activeNotebook}
      />
      <DeleteNotebookModal
        isOpen={isDeleteNotebookModalOpen}
        onRequestClose={setIsDeleteNotebookModalOpen.bind(null, false)}
        activeNotebook={state.activeNotebook}
        title={title}
      />
    </Style>
  )
}
