import React, { useState } from 'react'
import { useStore } from '../../../hooks'
import { useDeleteRepo } from '../../../hooks/Repo/useDeleteRepo'
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
  const [state] = useStore()
  const [inputValue, setInputValue] = useState('')
  const deleteRepo = useDeleteRepo(state.user.username)

  async function handleDeleteNotebook() {
    if (!activeNotebook) {
      alert('No active notebook')
      return
    }
    if (inputValue !== title) {
      alert('Please confirm the notebook you wish to delete')
      return
    }
    await deleteRepo({
      variables: {
        input: {
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

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  return (
    <Modal
      onContinue={handleDeleteNotebook}
      title="Delete Notebook"
      isOpen={isOpen}
      onRequestClose={handleRequestClose}
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
