import React, { useState } from 'react'
import { useStore } from '../../../hooks'
import { useDeleteFile } from '../../../hooks/file/useDeleteFile'
import { resetRepo } from '../../../store'
import { Modal } from '../../atoms'

interface IDeleteFileModal {
  isOpen: boolean
  onRequestClose: () => void
}

export function DeleteFileModal({ isOpen, onRequestClose }: IDeleteFileModal) {
  const [state, dispatch] = useStore()
  const [loading, setLoading] = useState(false)
  const deleteFile = useDeleteFile(state.user.username, state.repo.activeRepo)

  async function handleDeleteFile() {
    if (!state.repo.activeFile) {
      return
    }

    setLoading(true)
    try {
      await deleteFile({
        variables: {
          input: {
            filename: state.repo.activeFile,
            repo: state.repo.activeRepo,
            username: state.user.username,
          },
        },
      })
      dispatch(resetRepo({ file: true }))
      onRequestClose()
    } catch {
      alert('There was an issue deleting your file, please try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      onContinue={handleDeleteFile}
      title="Delete File"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      loading={loading}
    >
      <span>Please confirm you wish to delete a file.</span>
    </Modal>
  )
}
