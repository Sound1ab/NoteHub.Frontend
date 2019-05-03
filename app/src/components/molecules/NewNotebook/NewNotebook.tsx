import React, { useState } from 'react'
import { COLOR } from '../../../enums'
import { useStore } from '../../../hooks'
import { useCreateRepo } from '../../../hooks/Repo/useCreateRepo'
import { styled } from '../../../theme'
import { Heading, Icon, Modal } from '../../atoms'

const Style = styled.div`
  .NewNotebook-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.s};
    cursor: pointer;
  }
`

export function NewNotebook() {
  const [state] = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const createNewRepo = useCreateRepo(state.user.username)

  async function handleCreateNewRepo() {
    await createNewRepo({
      variables: {
        input: {
          name: inputValue,
        },
      },
    })
    setIsModalOpen(false)
  }

  function handleOnInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  return (
    <Style>
      <span
        className="NewNotebook-wrapper"
        onClick={setIsModalOpen.bind(null, true)}
      >
        <Icon
          size="lg"
          color={COLOR.ACCENT}
          icon="plus-circle"
          prefix="fa"
          marginRight
        />
        <Heading color={COLOR.LIGHT} type="h3">
          New Notebook
        </Heading>
      </span>
      <Modal
        onContinue={handleCreateNewRepo}
        title="Create new Notebook"
        isOpen={isModalOpen}
        onRequestClose={setIsModalOpen.bind(null, false)}
      >
        <Heading type="h5" marginBottom>
          Title
        </Heading>
        <input
          value={inputValue}
          onChange={handleOnInputChange}
          className="NewNotebook-input"
          type="text"
          placeholder="Notebook name"
        />
      </Modal>
    </Style>
  )
}
