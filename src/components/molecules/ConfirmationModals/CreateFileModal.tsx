import React, { useState } from 'react'
import { useStore } from '../../../hooks'
import { useCreateFile } from '../../../hooks/file/useCreateFile'
import { Heading, Modal } from '../../atoms'

interface ICreateFileModal {
  isOpen: boolean
  onRequestClose: () => void
}

export function CreateFileModal({ isOpen, onRequestClose }: ICreateFileModal) {
  const [state] = useStore()
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const createNewFile = useCreateFile(
    state.user.username,
    state.repo.activeRepo.name
  )

  async function handleCreateNewFile() {
    if (!state.repo.activeRepo) {
      alert('No active repo')
      return
    }
    setLoading(true)
    try {
      await createNewFile({
        variables: {
          input: {
            content: '',
            filename: `${inputValue}.md`,
            repo: state.repo.activeRepo.name,
            username: state.user.username,
          },
        },
      })
      handleRequestClose()
    } catch {
      alert('There was an issue saving your note, please try again')
    } finally {
      setLoading(false)
    }
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
      onContinue={handleCreateNewFile}
      title="Create new File"
      isOpen={isOpen}
      onRequestClose={handleRequestClose}
      loading={loading}
    >
      <Heading type="h5" marginBottom>
        Title
      </Heading>
      <input
        value={inputValue}
        onChange={handleOnInputChange}
        className="NewFile-input"
        type="text"
        placeholder="File name"
      />
    </Modal>
  )
}
