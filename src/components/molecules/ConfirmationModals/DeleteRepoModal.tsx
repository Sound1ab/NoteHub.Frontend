import React, { useEffect, useRef, useState } from 'react'
import {
  useReadCurrentRepoName,
  useDeleteRepo,
  useReadGithubUser,
} from '../../../hooks'
import { Heading, Modal } from '../../atoms'
import { useApolloClient } from 'react-apollo-hooks'

interface IDeleteRepoModal {
  isOpen: boolean
  onRequestClose: () => void
  title: string | null
}

export function DeleteRepoModal({
  isOpen,
  onRequestClose,
  title,
}: IDeleteRepoModal) {
  const inputEl = useRef<HTMLInputElement>(null)
  const user = useReadGithubUser()
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const deleteRepo = useDeleteRepo()
  const client = useApolloClient()
  const { currentRepoName } = useReadCurrentRepoName()

  async function handleDeleteRepo() {
    if (!user || !currentRepoName) {
      alert('Error')
      return
    }
    if (inputValue !== title) {
      alert('Please confirm the repo you wish to delete')
      return
    }

    setLoading(true)
    try {
      await deleteRepo({
        variables: {
          input: {
            repo: currentRepoName,
            username: user.login,
          },
        },
      })
      client.writeData({
        data: { currentRepoName: null, currentFileName: null },
      })
      handleRequestClose()
    } catch {
      alert('There was an issue deleting your repo, please try again')
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

  useEffect(() => {
    if (!isOpen) {
      return
    }

    // If it's dumb and it works it's not dumb
    // Input hasn't rendered before the effect runs so pushing onto the
    // callback queue so event loop will process after the stack (and as
    // consequence) rendering the input
    setTimeout(() => {
      if (!inputEl || !inputEl.current) {
        return
      }
      inputEl.current.focus()
    }, 1)
  }, [isOpen])

  return (
    <Modal
      onContinue={handleDeleteRepo}
      title="Delete Repo"
      isOpen={isOpen}
      onRequestClose={handleRequestClose}
      loading={loading}
    >
      <p>Please confirm the Repo name you wish to delete.</p>
      <Heading type="h5" marginBottom>
        Repo
      </Heading>
      <input
        ref={inputEl}
        value={inputValue}
        onChange={handleInputChange}
        type="text"
        placeholder="Repo name"
      />
    </Modal>
  )
}
