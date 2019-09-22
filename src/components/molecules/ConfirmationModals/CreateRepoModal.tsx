import React, { useState } from 'react'
import { useStore } from '../../../hooks'
import { useCreateRepo } from '../../../hooks/Repo/useCreateRepo'
import { styled } from '../../../theme'
import { Heading, Modal } from '../../atoms'

const Style = styled.div`
  .CreateRepo-input {
    margin-bottom: ${({theme}) => theme.spacing.xs};
  }
  
  .CreateRepo-checkbox {
    width: auto;
  }
`

interface ICreateRepoModal {
  isOpen: boolean
  onRequestClose: () => void
}

export function CreateRepoModal({ isOpen, onRequestClose }: ICreateRepoModal) {
  const [state] = useStore()
  const defaultState = {name: '', isPrivate: false}
  const [{name, isPrivate}, setForm] = useState<{[key: string]: any}>(defaultState)
  const [loading, setLoading] = useState(false)
  const createNewRepo = useCreateRepo(state.user.username)

  async function handleCreateNewRepo() {
    setLoading(true)
    try {
      await createNewRepo({
        variables: {
          input: {
            name,
            private: isPrivate
          },
        },
      })
      handleRequestClose()
    } catch {
      alert('There was an issue creating your repo, please try again')
    } finally {
      setLoading(false)
    }
  }

  function handleRequestClose() {
    setForm(defaultState)
    onRequestClose()
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const targetName = target.name;

    setForm((prevState) => ({
      ...prevState,
      [targetName]: value
    }));
  }

  return (
    <Modal
      onContinue={handleCreateNewRepo}
      title="Create new Repo"
      isOpen={isOpen}
      onRequestClose={handleRequestClose}
      loading={loading}
    >
      <Style>
        <label>
          <Heading type="h5" marginBottom>
            Title
          </Heading>
        </label>
        <form>
        <input
          value={name}
          onChange={handleInputChange}
          className="CreateRepo-input"
          type="text"
          placeholder="Repo name"
          name="name"
        />
          <label>
            <Heading type="h5" marginBottom>
              Private
            </Heading>
          </label>
          <input
            name="isPrivate"
            type="checkbox"
            className="CreateRepo-checkbox"
            checked={isPrivate}
            onChange={handleInputChange} />
        </form>
      </Style>
    </Modal>
  )
}
