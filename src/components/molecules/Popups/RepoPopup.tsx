import React, { useState } from 'react'
import { DeleteRepoModal, Popup } from '..'
import { COLOR } from '../../../enums'
import { useStore } from '../../../hooks'
import { styled } from '../../../theme'
import { Heading, Icon } from '../../atoms'

const Style = styled.div`
  .RepoPopup-option {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`

export function RepoPopup() {
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
      >
        <button
          className="RepoPopup-option"
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
