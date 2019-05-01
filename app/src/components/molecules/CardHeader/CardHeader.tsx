import gql from 'graphql-tag'
import React, { useState } from 'react'
import { useMutation } from 'react-apollo-hooks'
import { COLOR } from '../../../enums'
import { NoteFragment } from '../../../fragments'
import { useStore } from '../../../hooks/useStore'
import { styled } from '../../../theme'
import {
  CreateNoteMutation,
  CreateNoteMutationVariables,
  ListNotesDocument,
  ListNotesQuery,
} from '../../apollo/generated_components_typings'
import { Heading, Icon, Modal } from '../../atoms'

const Style = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.s};
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text.secondary};

  .CardHeader-options {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .CardHeader-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .CardHeader-new-note {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`

export const CreateNoteDocument = gql`
  ${NoteFragment}
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      ...note
    }
  }
`

interface ICardHeader {
  title?: string | null
}

export function CardHeader({ title = '' }: ICardHeader) {
  const [state] = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const createNewNote = useMutation<
    CreateNoteMutation,
    CreateNoteMutationVariables
  >(CreateNoteDocument, {
    update: (cache, { data }) => {
      const newNote = data && data.createNote
      if (!newNote) return

      const result = cache.readQuery<ListNotesQuery>({
        query: ListNotesDocument,
        variables: {
          filter: { notebookId: { eq: state.activeNotebook } },
        },
      })

      const notes = (result && result.listNotes && result.listNotes.items) || []

      cache.writeQuery<ListNotesQuery>({
        data: {
          listNotes: {
            items: notes.concat([{ ...newNote }]),
          },
        },
        query: ListNotesDocument,
        variables: {
          filter: { notebookId: { eq: state.activeNotebook } },
        },
      })
    },
  })

  async function handleCreateNewNote() {
    if (!state.activeNotebook) {
      alert('No active notebook')
      return
    }
    await createNewNote({
      variables: {
        input: {
          excerpt: '',
          markdown: '',
          notebookId: state.activeNotebook,
          title: inputValue,
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
      <Heading type="h2" marginBottom>
        {title}
      </Heading>
      <div className="CardHeader-wrapper">
        <div
          className="CardHeader-new-note"
          onClick={setIsModalOpen.bind(null, true)}
        >
          <Icon
            size="lg"
            color={COLOR.ACCENT}
            icon="plus-circle"
            prefix="fa"
            marginRight
          />
          <Heading color={COLOR.DARK} type="h3">
            New Note
          </Heading>
        </div>
        <div className="CardHeader-options">
          <Icon
            color={COLOR.MEDIUM}
            icon="sync"
            prefix="fa"
            marginRight
            size="sm"
          />
          <Icon color={COLOR.MEDIUM} icon="trash" prefix="fa" size="sm" />
        </div>
      </div>
      <Modal
        onContinue={handleCreateNewNote}
        title="Create new Note"
        isOpen={isModalOpen}
        onRequestClose={setIsModalOpen.bind(null, false)}
      >
        <Heading type="h5" marginBottom>
          Title
        </Heading>
        <input
          value={inputValue}
          onChange={handleOnInputChange}
          className="NewNote-input"
          type="text"
          placeholder="Note name"
        />
      </Modal>
    </Style>
  )
}
