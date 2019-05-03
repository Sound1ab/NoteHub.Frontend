import React, { useState } from 'react'
import { useStore } from '../../../hooks'
import { useCreateFile } from '../../../hooks/file/useCreateFile'
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
  const [state] = useStore()
  const [inputValue, setInputValue] = useState('')
  const createNewNote = useCreateFile(state.user.username, activeNotebook || '')

  async function handleCreateNewNote() {
    if (!activeNotebook) {
      alert('No active notebook')
      return
    }
    await createNewNote({
      variables: {
        input: {
          content: '',
          filename: `${inputValue}.md`,
          repo: activeNotebook,
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
