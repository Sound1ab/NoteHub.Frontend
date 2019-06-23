import React, { useState } from 'react'
import { styled } from '../../../theme'
import { useStore } from '../../../hooks'
import { CreateFileModal, DeleteRepoModal, DeleteFileModal } from '..'
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
  const [isCreateFileModalOpen, setIsCreateFileModalOpen] = useState(false)
  const [isDeleteRepoModalOpen, setIsDeleteRepoModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  return (
    <Style>
      {state.repo.activeRepo &&
        `${state.repo.activeRepo} ${state.repo.activeFile &&
          ` / ${state.repo.activeFile}`}`}
      <div
        className="Toolbar-new-note"
        onClick={setIsCreateFileModalOpen.bind(null, true)}
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
          onClick={setIsDeleteRepoModalOpen.bind(null, true)}
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
          href={state.repo.activeFile}
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
      <CreateFileModal
        isOpen={isCreateFileModalOpen}
        onRequestClose={setIsCreateFileModalOpen.bind(null, false)}
      />
      <DeleteRepoModal
        isOpen={isDeleteRepoModalOpen}
        onRequestClose={setIsDeleteRepoModalOpen.bind(null, false)}
        title={state.repo.activeRepo}
      />
      <DeleteFileModal
        isOpen={isDeleteModalOpen}
        onRequestClose={setIsDeleteModalOpen.bind(null, false)}
      />
    </Style>
  )
}
