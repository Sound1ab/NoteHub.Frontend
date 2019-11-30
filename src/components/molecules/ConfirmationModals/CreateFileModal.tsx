import React, { useEffect, useRef, useState } from 'react'
import {
  useCreateFile,
  useReadCurrentRepoName,
  useReadCurrentFileName,
  useReadGithubUser,
} from '../../../hooks'
import { Heading, Modal } from '../../atoms'

interface ICreateFileModal {
  isOpen: boolean
  onRequestClose: () => void
}

export function CreateFileModal({ isOpen, onRequestClose }: ICreateFileModal) {
  const inputEl = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const createNewFile = useCreateFile()
  const user = useReadGithubUser()
  const { currentRepoName } = useReadCurrentRepoName()
  const { currentFileName } = useReadCurrentFileName()

  async function handleCreateNewFile() {
    if (!user || !currentRepoName || !currentFileName) {
      alert('Error')
      return
    }
    setLoading(true)
    try {
      await createNewFile({
        variables: {
          input: {
            content: '',
            filename: `${inputValue}.md`,
            repo: currentRepoName,
            username: user.login,
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
        ref={inputEl}
        value={inputValue}
        onChange={handleOnInputChange}
        className="NewFile-input"
        type="text"
        placeholder="File name"
      />
    </Modal>
  )
}
