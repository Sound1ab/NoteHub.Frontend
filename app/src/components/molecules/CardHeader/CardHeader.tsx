import React, { useState } from 'react'
import { DeleteRepoModal } from '..'
import { CreateFileModal } from '../'
import { COLOR } from '../../../enums'
import { styled } from '../../../theme'
import { Heading, Icon } from '../../atoms'

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
    div + div {
      margin-left: ${({ theme }) => theme.spacing.xs};
    }
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

interface ICardHeader {
  title?: string | null
}

export function CardHeader({ title = '' }: ICardHeader) {
  const [isCreateFileModalOpen, setIsCreateFileModalOpen] = useState(false)
  const [isDeleteRepoModalOpen, setIsDeleteRepoModalOpen] = useState(false)

  return (
    <Style>
      <Heading type="h2" marginBottom>
        {title}
      </Heading>
      <div className="CardHeader-wrapper">
        <div
          className="CardHeader-new-note"
          onClick={setIsCreateFileModalOpen.bind(null, true)}
        >
          <Icon
            size="lg"
            color={COLOR.ACCENT}
            icon="plus-circle"
            prefix="fa"
            marginRight
          />
          <Heading color={COLOR.DARK} type="h3">
            New File
          </Heading>
        </div>
        <div className="CardHeader-options">
          <Icon
            color={COLOR.MEDIUM}
            icon="trash"
            prefix="fa"
            size="sm"
            onClick={setIsDeleteRepoModalOpen.bind(null, true)}
          />
        </div>
      </div>
      <CreateFileModal
        isOpen={isCreateFileModalOpen}
        onRequestClose={setIsCreateFileModalOpen.bind(null, false)}
      />
      <DeleteRepoModal
        isOpen={isDeleteRepoModalOpen}
        onRequestClose={setIsDeleteRepoModalOpen.bind(null, false)}
        title={title}
      />
    </Style>
  )
}
