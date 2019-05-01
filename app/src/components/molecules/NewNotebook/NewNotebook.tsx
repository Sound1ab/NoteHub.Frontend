import gql from 'graphql-tag'
import React, { useState } from 'react'
import { useMutation } from 'react-apollo-hooks'
import { COLOR } from '../../../enums'
import { NotebookFragment } from '../../../fragments'
import { styled } from '../../../theme'
import {
  CreateNotebookMutation,
  CreateNotebookMutationVariables,
  ListNotebooksDocument,
  ListNotebooksQuery,
} from '../../apollo/generated_components_typings'
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

export const CreateNotebookDocument = gql`
  ${NotebookFragment}
  mutation CreateNotebook($input: CreateNotebookInput!) {
    createNotebook(input: $input) {
      ...notebook
    }
  }
`

export function NewNotebook() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const createNewNotebook = useMutation<
    CreateNotebookMutation,
    CreateNotebookMutationVariables
  >(CreateNotebookDocument, {
    update: (cache, { data }) => {
      const newNotebook = data && data.createNotebook
      if (!newNotebook) return

      const result = cache.readQuery<ListNotebooksQuery>({
        query: ListNotebooksDocument,
        variables: {
          filter: { userId: { eq: '985d9b4d-920d-4b4f-9358-ab91146944d8' } },
        },
      })

      const notebooks =
        (result && result.listNotebooks && result.listNotebooks.items) || []

      cache.writeQuery<ListNotebooksQuery>({
        data: {
          listNotebooks: {
            items: notebooks.concat([{ ...newNotebook }]),
          },
        },
        query: ListNotebooksDocument,
        variables: {
          filter: { userId: { eq: '985d9b4d-920d-4b4f-9358-ab91146944d8' } },
        },
      })
    },
  })

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
