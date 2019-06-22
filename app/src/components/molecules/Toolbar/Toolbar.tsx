import React, { useState } from 'react'
import { styled } from '../../../theme'
import { useStore } from '../../../hooks'
import { CreateNoteModal, DeleteNotebookModal, DeleteNoteModal } from '..'
import { Heading, Icon } from '../../atoms'
import { COLOR } from '../../../enums'

const Style = styled.div`
  grid-area: toolbar;
  position: relative;
  padding: ${({ theme }) => theme.spacing.s};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.m};

  .Toolbar-options {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  > div + div {
    margin-left: ${({ theme }) => theme.spacing.xs};
  }

  .Toolbar-new-note {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: auto;
  }
`

interface IToolbar {
  dummyProp?: string
}

export function Toolbar({ dummyProp = 'Toolbar' }: IToolbar) {
  const [state, dispatch] = useStore()
  const [isCreateNoteModalOpen, setIsCreateNoteModalOpen] = useState(false)
  const [isDeleteNotebookModalOpen, setIsDeleteNotebookModalOpen] = useState(
    false
  )
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  return (
    <Style>
      {state.notebook.activeNotebook &&
        `${state.notebook.activeNotebook} ${state.notebook.activeNote &&
          ` / ${state.notebook.activeNote}`}`}
      <div
        className="Toolbar-new-note"
        onClick={setIsCreateNoteModalOpen.bind(null, true)}
      >
        <Icon
          size="lg"
          color={COLOR.ACCENT}
          icon="plus-circle"
          prefix="fa"
          marginRight
        />
      </div>
      <div className="Toolbar-options">
        <Icon
          color={COLOR.MEDIUM}
          icon="trash"
          prefix="fa"
          size="sm"
          onClick={setIsDeleteNotebookModalOpen.bind(null, true)}
        />
      </div>
      <div className="Toolbar-options">
        <Icon
          color={COLOR.MEDIUM}
          icon="trash"
          prefix="fa"
          size="sm"
          onClick={setIsDeleteModalOpen.bind(null, true)}
        />
      </div>
      <div className="Toolbar-options">
        <a
          href={state.notebook.activeNote}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon
            color={COLOR.MEDIUM}
            icon="external-link-alt"
            prefix="fa"
            size="sm"
          />
        </a>
      </div>
      <CreateNoteModal
        isOpen={isCreateNoteModalOpen}
        onRequestClose={setIsCreateNoteModalOpen.bind(null, false)}
      />
      <DeleteNotebookModal
        isOpen={isDeleteNotebookModalOpen}
        onRequestClose={setIsDeleteNotebookModalOpen.bind(null, false)}
        title={state.notebook.activeNotebook}
      />
      <DeleteNoteModal
        isOpen={isDeleteModalOpen}
        onRequestClose={setIsDeleteModalOpen.bind(null, false)}
      />
    </Style>
  )
}
