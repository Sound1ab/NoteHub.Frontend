import React, { useState } from 'react'
import { useStore } from '../../../hooks'
import { useDeleteRepo } from '../../../hooks/Repo/useDeleteRepo'
import { resetRepo } from '../../../store'
import { Heading, Modal } from '../../atoms'

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
  const [state, dispatch] = useStore()
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const deleteRepo = useDeleteRepo(state.user.username)

  async function handleDeleteRepo() {
    if (!state.repo.activeRepo) {
      alert('No active repo')
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
            repo: state.repo.activeRepo.name,
            username: state.user.username,
          },
        },
      })
      dispatch(resetRepo())
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
        value={inputValue}
        onChange={handleInputChange}
        type="text"
        placeholder="Repo name"
      />
    </Modal>
  )
}
