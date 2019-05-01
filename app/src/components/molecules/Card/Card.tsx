import React, { useState } from 'react'
import { DeleteNoteModal } from '..'
import { COLOR } from '../../../enums'
import { useStore } from '../../../hooks'
import { styled } from '../../../theme'
import { Heading, Icon } from '../../atoms'

const Style = styled.div<{ isSelected?: boolean }>`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.s};
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.link.active : 'transparent'};
  cursor: pointer;
  overflow: hidden;

  .Card-heading {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  .Card-excerpt {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .Card-created-at {
    white-space: nowrap;
  }

  .Card-options {
    display: flex;
    justify-content: flex-end;
  }
`

interface ICard {
  id: string
  title: string
  excerpt: string
  createdAt: string
  isSelected?: boolean
}

export function Card({ title, excerpt, createdAt, isSelected }: ICard) {
  const [state] = useStore()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  return (
    <Style data-testid="Card" isSelected={isSelected}>
      <div className="Card-heading">
        <Heading type="h4">{title}</Heading>
        <Heading className="Card-created-at" color={COLOR.MEDIUM} type="h6">
          {createdAt}
        </Heading>
      </div>
      <p className="Card-excerpt">{excerpt}</p>
      <div className="Card-options">
        <Icon
          color={COLOR.MEDIUM}
          icon="trash"
          prefix="fa"
          size="sm"
          onClick={setIsDeleteModalOpen.bind(null, true)}
        />
      </div>
      <DeleteNoteModal
        isOpen={isDeleteModalOpen}
        onRequestClose={setIsDeleteModalOpen.bind(null, false)}
        activeNote={state.activeNote}
        activeNotebook={state.activeNotebook}
      />
    </Style>
  )
}
