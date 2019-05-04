import React, { useState } from 'react'
import { useStore } from '../../../hooks'
import { useCreateRepo } from '../../../hooks/Repo/useCreateRepo'
import { Heading, Modal } from '../../atoms'

interface ICreateNotebookModal {
  isOpen: boolean
  onRequestClose: () => void
}

export function CreateNotebookModal({
  isOpen,
  onRequestClose,
}: ICreateNotebookModal) {
  const [state] = useStore()
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const createNewRepo = useCreateRepo(state.user.username)

  async function handleCreateNewRepo() {
    setLoading(true)
    try {
      await createNewRepo({
        variables: {
          input: {
            name: inputValue,
          },
        },
      })
      handleRequestClose()
    } catch {
      alert('There was an issue creating your notebook, please try again')
    } finally {
      setLoading(false)
    }
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
      onContinue={handleCreateNewRepo}
      title="Create new Notebook"
      isOpen={isOpen}
      onRequestClose={handleRequestClose}
      loading={loading}
    >
      <Heading type="h5" marginBottom>
        Title
      </Heading>
      <input
        value={inputValue}
        onChange={handleInputChange}
        className="NewNotebook-input"
        type="text"
        placeholder="Notebook name"
      />
    </Modal>
  )
}
