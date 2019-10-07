import React, { useState } from 'react'
import { DeleteFileModal } from '..'
import { COLOR } from '../../../enums'
import { useStore } from '../../../hooks'
import { styled } from '../../../theme'
import { Heading, Icon } from '../../atoms'
import {Popup} from './Popup'

const Style = styled.div`
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
        activeFile: { filename, _links },
      },
    },
  ] = useStore()

  return (
    <Style>
      <Popup
        trigger={
          <button>
            {filename && (
              <Heading color={COLOR.INHERIT} type="h4">
                {filename}
              </Heading>
            )}
          </button>
        }
        position="bottom right"
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
