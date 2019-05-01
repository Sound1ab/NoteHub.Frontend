import React, { useState } from 'react'
import { useDeleteNotebook } from '../../../hooks'
import { Heading, Modal } from '../../atoms'

interface IDeleteNotebookModal {
  isOpen: boolean
  onRequestClose: () => void
  activeNotebook: string | null
  title: string | null
}

export function DeleteNotebookModal({
  isOpen,
  onRequestClose,
  activeNotebook,
  title,
}: IDeleteNotebookModal) {
  const [inputValue, setInputValue] = useState('')
  const deleteNotebook = useDeleteNotebook()

  async function handleDeleteNotebook() {
    if (!activeNotebook) {
      alert('No active notebook')
      return
    }
    if (inputValue !== title) {
      alert('Please confirm the notebook you wish to delete')
      return
    }
    await deleteNotebook({
      variables: {
        input: {
          id: activeNotebook,
        },
      },
    })
    onRequestClose()
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  return (
    <Modal
      onContinue={handleDeleteNotebook}
      title="Delete Notebook"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <p>Please confirm the Notebook name you wish to delete.</p>
      <Heading type="h5" marginBottom>
        Notebook
      </Heading>
      <input
        value={inputValue}
        onChange={handleInputChange}
        type="text"
        placeholder="Notebook name"
      />
    </Modal>
  )
}
