import React, { useState } from 'react'
import {
  useDeleteFile,
  useReadCurrentRepoName,
  useReadCurrentFileName,
  useReadGithubUser,
} from '../../../hooks'
import { Modal } from '../../atoms'
import { useApolloClient } from '@apollo/react-hooks'

interface IDeleteFileModal {
  isOpen: boolean
  onRequestClose: () => void
}

export function DeleteFileModal({ isOpen, onRequestClose }: IDeleteFileModal) {
  const [loading, setLoading] = useState(false)
  const [deleteFile] = useDeleteFile()
  const client = useApolloClient()
  const user = useReadGithubUser()
  const { currentRepoName } = useReadCurrentRepoName()
  const { currentFileName } = useReadCurrentFileName()

  async function handleDeleteFile() {
    if (!user || !currentRepoName || !currentFileName) {
      alert('Error')
      return
    }

    setLoading(true)
    try {
      await deleteFile({
        variables: {
          input: {
            filename: currentFileName,
            repo: currentRepoName,
            username: user.login,
          },
        },
      })
      client.writeData({
        data: { currentRepoName: null },
      })
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
