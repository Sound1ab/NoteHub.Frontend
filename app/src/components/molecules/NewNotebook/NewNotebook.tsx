import gql from 'graphql-tag'
import React from 'react'
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
import { Heading, Icon } from '../../atoms'

const Style = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.s};
  cursor: pointer;
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
          title: 'Test Notebook',
          userId: '985d9b4d-920d-4b4f-9358-ab91146944d8',
        },
      },
    })
  }

  return (
    <Style onClick={handleCreateNewNotebook}>
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
    </Style>
  )
}
