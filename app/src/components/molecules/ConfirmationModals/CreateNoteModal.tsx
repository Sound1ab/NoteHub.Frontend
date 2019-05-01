import React, { useState } from 'react'
import { useCreateNote } from '../../../hooks'
import { Heading, Modal } from '../../atoms'

interface ICreateNoteModal {
  isOpen: boolean
  onRequestClose: () => void
  activeNotebook: string | null
}

export function CreateNoteModal({
  isOpen,
  onRequestClose,
  activeNotebook,
}: ICreateNoteModal) {
  const [inputValue, setInputValue] = useState('')
  const createNewNote = useCreateNote(activeNotebook)

  async function handleCreateNewNote() {
    if (!activeNotebook) {
      alert('No active notebook')
      return
    }
    await createNewNote({
      variables: {
        input: {
          excerpt: '',
          markdown: '',
          notebookId: activeNotebook,
          title: inputValue,
        },
      },
    })
    onRequestClose()
  }

  function handleOnInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  return (
    <Modal
      onContinue={handleCreateNewNote}
      title="Create new Note"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
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
  )
}
