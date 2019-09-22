import React, { useState } from 'react'
import { useStore } from '../../../hooks'
import { useUpdateFile } from '../../../hooks/file/useUpdateFile'
import { Heading, Modal } from '../../atoms'

interface ICreateFileModal {
  isOpen: boolean
  onRequestClose: () => void
}

export function UpdateFileModal({ isOpen, onRequestClose }: ICreateFileModal) {
  const [{user: {username}, repo: {activeFile, activeRepo}}] = useStore()
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const updateFile = useUpdateFile(
    username,
    activeRepo.name,
    activeFile.filename
  )

  async function handleCreateNewFile() {
    if (!activeRepo) {
      alert('No active repo')
      return
    }
    setLoading(true)
    try {
      await updateFile({
        variables: {
          input: {
            content: activeFile.content,
            filename: `${inputValue}.md`,
            repo: activeRepo.name,
            sha: activeFile.sha,
            username,
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
      title="Update File"
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
