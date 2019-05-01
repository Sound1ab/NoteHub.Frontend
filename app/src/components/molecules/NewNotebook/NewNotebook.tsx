import React, { useState } from 'react'
import { COLOR } from '../../../enums'
import { useCreateNotebook } from '../../../hooks'
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const createNewNotebook = useCreateNotebook()

  async function handleCreateNewNotebook() {
    await createNewNotebook({
      variables: {
        input: {
          title: inputValue,
          userId: '985d9b4d-920d-4b4f-9358-ab91146944d8',
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
        onContinue={handleCreateNewNotebook}
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
