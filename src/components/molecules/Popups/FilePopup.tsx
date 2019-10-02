import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import { DeleteFileModal } from '..'
import { COLOR } from '../../../enums'
import { useStore } from '../../../hooks'
import { styled } from '../../../theme'
import { Heading, Icon } from '../../atoms'

const Style = styled.div`
  .FilePopup-content {
    padding: ${({ theme }) => theme.spacing.xs}!important;
    background-color: ${({ theme }) =>
      theme.colors.background.tertiary}!important;
    box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.2) !important;
    border: none !important;

    & > button + button {
      margin-top: ${({ theme }) => theme.spacing.xs};
    }
  }

  .FilePopup-arrow {
    background-color: ${({ theme }) =>
      theme.colors.background.tertiary}!important;
    border: none !important;
    box-shadow: none !important;
  }

  .FilePopup-option {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`

export function FilePopup() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const [
    {
      repo: {
        activeFile: { _links },
      },
    },
  ] = useStore()

  return (
    <Style>
      <Popup
        trigger={
          <button>
            <Icon
              icon="ellipsis-h"
              prefix="fa"
              size="lg"
              marginLeft
              marginRight
            />
          </button>
        }
        position="bottom right"
        className="FilePopup"
      >
        <>
          <button
            className="FilePopup-option"
            onClick={setIsDeleteModalOpen.bind(null, true)}
          >
            <Icon icon="trash" prefix="fa" size="sm" marginRight />
            <Heading color={COLOR.INHERIT} type="h5">
              Delete File
            </Heading>
          </button>
          <button>
            <a
              className="FilePopup-option"
              href={_links.html}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                icon="external-link-alt"
                prefix="fa"
                size="sm"
                marginRight
              />
              <Heading color={COLOR.INHERIT} type="h5">
                View on Github
              </Heading>
            </a>
          </button>
        </>
      </Popup>
      <DeleteFileModal
        isOpen={isDeleteModalOpen}
        onRequestClose={setIsDeleteModalOpen.bind(null, false)}
      />
    </Style>
  )
}
