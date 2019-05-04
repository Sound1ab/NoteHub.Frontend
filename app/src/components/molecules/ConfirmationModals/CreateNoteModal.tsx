import React, { useState } from 'react'
import { useStore } from '../../../hooks'
import { useCreateFile } from '../../../hooks/file/useCreateFile'
import { Heading, Modal } from '../../atoms'

interface ICreateNoteModal {
  isOpen: boolean
  onRequestClose: () => void
}

export function CreateNoteModal({ isOpen, onRequestClose }: ICreateNoteModal) {
  const [state] = useStore()
  const [inputValue, setInputValue] = useState('')
  const createNewNote = useCreateFile(
    state.user.username,
    state.notebook.activeNotebook || ''
  )

  async function handleCreateNewNote() {
    if (!state.notebook.activeNotebook) {
      alert('No active notebook')
      return
    }
    await createNewNote({
      variables: {
        input: {
          content: '',
          filename: `${inputValue}.md`,
          repo: state.notebook.activeNotebook,
          username: state.user.username,
        },
      },
    })
    handleRequestClose()
  }

  function handleRequestClose() {
    setInputValue('')
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
      onRequestClose={handleRequestClose}
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
