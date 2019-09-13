import React, { useState } from 'react'
import { CreateRepoModal } from '..'
import { COLOR } from '../../../enums'
import { styled } from '../../../theme'
import { Heading, Icon } from '../../atoms'

const Style = styled.div`
  .NewRepo-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.s};
    cursor: pointer;
  }
`

export function NewRepo() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Style>
      <span
        className="NewRepo-wrapper"
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
          New Repo
        </Heading>
      </span>
      <CreateRepoModal
        isOpen={isModalOpen}
        onRequestClose={setIsModalOpen.bind(null, false)}
      />
    </Style>
  )
}
