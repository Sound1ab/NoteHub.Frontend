import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import { DeleteRepoModal } from '..'
import { COLOR } from '../../../enums'
import { useStore } from '../../../hooks'
import { styled } from '../../../theme'
import { Heading, Icon } from '../../atoms'

const Style = styled.div`
  .FilePopup-option {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`

interface IFilePopup {
  dummyProp?: string
}

export function FilePopup({ dummyProp = '' }: IFilePopup) {
  const [isDeleteRepoModalOpen, setIsDeleteRepoModalOpen] = useState(false)

  const [
    {
      repo: {
        activeRepo: { name },
      },
    },
  ] = useStore()

  return (
    <Style>
      <Popup
        trigger={
          <button>
            {name && (
              <Heading color={COLOR.INHERIT} type="h4">
                {name}
              </Heading>
            )}
          </button>
        }
        position="bottom left"
        className="Toolbar-tooltip"
      >
        <button
          className="FilePopup-option"
          onClick={setIsDeleteRepoModalOpen.bind(null, true)}
        >
          <Icon icon="trash" prefix="fa" size="sm" marginRight />
          <Heading color={COLOR.INHERIT} type="h5">
            Delete Repo
          </Heading>
        </button>
      </Popup>
      <DeleteRepoModal
        isOpen={isDeleteRepoModalOpen}
        onRequestClose={setIsDeleteRepoModalOpen.bind(null, false)}
        title={name}
      />
    </Style>
  )
}
