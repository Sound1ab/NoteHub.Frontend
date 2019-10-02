import React, { useState } from 'react'
import { COLOR } from '../../../enums'
import { styled } from '../../../theme'
import { ColorModeButton, Icon } from '../../atoms'
import {
  CreateFileModal,
  FilePopup,
  RepoPopup,
} from '../../molecules'

const Style = styled.div`
  grid-area: toolbar;
  position: relative;
  padding: ${({ theme }) => theme.spacing.s};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.m};

  .Toolbar-new-note {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: auto;
  }
`

export function Toolbar() {
  const [isCreateFileModalOpen, setIsCreateFileModalOpen] = useState(false)

  return (
    <Style>
      <RepoPopup />
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
      <FilePopup />
      <Icon
        icon="grip-lines-vertical"
        prefix="fa"
        size="lg"
        color={COLOR.MEDIUM}
      />
      <ColorModeButton />
      <CreateFileModal
        isOpen={isCreateFileModalOpen}
        onRequestClose={setIsCreateFileModalOpen.bind(null, false)}
      />
    </Style>
  )
}
