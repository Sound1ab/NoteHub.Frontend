import React, { useState } from 'react'
import { COLOR } from '../../../enums'
import { useCreateNote, useDeleteNotebook } from '../../../hooks'
import { useStore } from '../../../hooks/useStore'
import { styled } from '../../../theme'
import { Heading, Icon, Modal } from '../../atoms'

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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteNotebookModalOpen, setIsDeleteNotebookModalOpen] = useState(
    false
  )
  const [inputValue, setInputValue] = useState('')
  const [deleteNotebookInputValue, setDeleteNotebookInputValue] = useState('')

  const createNewNote = useCreateNote(state.activeNotebook)
  const deleteNotebook = useDeleteNotebook()

  async function handleDeleteNotebook() {
    if (!state.activeNotebook) {
      alert('No active notebook')
      return
    }
    if (deleteNotebookInputValue !== title) {
      alert('Please confirm the notebook you wish to delete')
      return
    }
    await deleteNotebook({
      variables: {
        input: {
          id: state.activeNotebook,
        },
      },
    })
    setIsDeleteNotebookModalOpen(false)
  }

  async function handleCreateNewNote() {
    if (!state.activeNotebook) {
      alert('No active notebook')
      return
    }
    await createNewNote({
      variables: {
        input: {
          excerpt: '',
          markdown: '',
          notebookId: state.activeNotebook,
          title: inputValue,
        },
      },
    })
    setIsModalOpen(false)
  }

  function handleOnInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  function handleOnDeleteNotebookInputChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setDeleteNotebookInputValue(e.target.value)
  }

  return (
    <Style>
      <Heading type="h2" marginBottom>
        {title}
      </Heading>
      <div className="CardHeader-wrapper">
        <div
          className="CardHeader-new-note"
          onClick={setIsModalOpen.bind(null, true)}
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
          <Icon
            color={COLOR.MEDIUM}
            icon="sync"
            prefix="fa"
            marginRight
            size="sm"
          />
          <Icon
            color={COLOR.MEDIUM}
            icon="trash"
            prefix="fa"
            size="sm"
            onClick={setIsDeleteNotebookModalOpen.bind(null, true)}
          />
        </div>
      </div>
      <Modal
        onContinue={handleCreateNewNote}
        title="Create new Note"
        isOpen={isModalOpen}
        onRequestClose={setIsModalOpen.bind(null, false)}
      >
        <Heading type="h5" marginBottom>
          Title
        </Heading>
        <input
          value={inputValue}
          onChange={handleOnInputChange}
          className="NewNote-input"
          type="text"
          placeholder="Note name"
        />
      </Modal>
      <Modal
        onContinue={handleDeleteNotebook}
        title="Delete Notebook"
        isOpen={isDeleteNotebookModalOpen}
        onRequestClose={setIsDeleteNotebookModalOpen.bind(null, false)}
      >
        <p>Please confirm the Notebook name you wish to delete.</p>
        <Heading type="h5" marginBottom>
          Notebook
        </Heading>
        <input
          value={deleteNotebookInputValue}
          onChange={handleOnDeleteNotebookInputChange}
          className="NewNote-input"
          type="text"
          placeholder="Notebook name"
        />
      </Modal>
    </Style>
  )
}
