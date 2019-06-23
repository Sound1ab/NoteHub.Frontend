import React, { useState } from 'react'
import Popover from 'react-awesome-popover'
import { CreateFileModal, DeleteFileModal, DeleteRepoModal } from '..'
import { COLOR } from '../../../enums'
import { useStore } from '../../../hooks'
import { styled } from '../../../theme'
import { Heading, Icon } from '../../atoms'

const Style = styled.div`
  grid-area: toolbar;
  position: relative;
  padding: ${({ theme }) => theme.spacing.s};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.m};

  .Toolbar-option {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .Toolbar-new-note {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  .Toolbar-tooltip {
    padding: ${({ theme }) => theme.spacing.xs};
    background-color: ${({ theme }) => theme.colors.background.tertiary};
    box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.2);

    &__left {
      margin-left: ${({ theme }) => theme.spacing.xxs};
    }

    &__right {
      margin-right: ${({ theme }) => theme.spacing.xxs};
    }

    & > * + * {
      margin-top: ${({ theme }) => theme.spacing.xs};
    }
  }
`

export function Toolbar() {
  const [state] = useStore()
  const [isCreateFileModalOpen, setIsCreateFileModalOpen] = useState(false)
  const [isDeleteRepoModalOpen, setIsDeleteRepoModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  return (
    <Style>
      <Popover placement="right-start">
        <button>
          {state.repo.activeRepo.name && (
            <Heading color={COLOR.INHERIT} type="h4">
              {state.repo.activeRepo.name}
            </Heading>
          )}
        </button>
        <div className="Toolbar-tooltip Toolbar-tooltip__left">
          <button
            className="Toolbar-option"
            onClick={setIsDeleteRepoModalOpen.bind(null, true)}
          >
            <Icon icon="trash" prefix="fa" size="sm" marginRight />
            <Heading color={COLOR.INHERIT} type="h5">
              Delete Repo
            </Heading>
          </button>
        </div>
      </Popover>
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

      <Icon
        icon="grip-lines-vertical"
        prefix="fa"
        size="lg"
        color={COLOR.MEDIUM}
      />

      <Popover placement="right-start">
        <button>
          <Icon icon="ellipsis-h" prefix="fa" size="lg" marginLeft />
        </button>
        <div className="Toolbar-tooltip Toolbar-tooltip__right">
          <button
            className="Toolbar-option"
            onClick={setIsDeleteModalOpen.bind(null, true)}
          >
            <Icon icon="trash" prefix="fa" size="sm" marginRight />
            <Heading color={COLOR.INHERIT} type="h5">
              Delete File
            </Heading>
          </button>
          <a
            className="Toolbar-option"
            href={state.repo.activeFile._links.html}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon="external-link-alt" prefix="fa" size="sm" marginRight />
            <Heading color={COLOR.INHERIT} type="h5">
              View on Github
            </Heading>
          </a>
        </div>
      </Popover>
      <CreateFileModal
        isOpen={isCreateFileModalOpen}
        onRequestClose={setIsCreateFileModalOpen.bind(null, false)}
      />
      <DeleteRepoModal
        isOpen={isDeleteRepoModalOpen}
        onRequestClose={setIsDeleteRepoModalOpen.bind(null, false)}
        title={state.repo.activeRepo.name}
      />
      <DeleteFileModal
        isOpen={isDeleteModalOpen}
        onRequestClose={setIsDeleteModalOpen.bind(null, false)}
      />
    </Style>
  )
}
