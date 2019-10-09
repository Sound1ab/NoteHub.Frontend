import React, { useState } from 'react'
import { COLOR } from '../../../enums'
import { useStore } from '../../../hooks'
import { isPreview } from '../../../store'
import { styled } from '../../../theme'
import { Icon } from '../../atoms'
import { CreateFileModal, FilePopup, RepoPopup } from '../../molecules'

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
  const [state, dispatch] = useStore()

  const [
    {
      repo: {
        activeFile: { filename },
      },
    },
  ] = useStore()

  function handleSetPreview(){
    dispatch(isPreview(!state.toolbar.isPreview))
  }

  return (
    <Style>
      <RepoPopup />
      {filename && (
        <Icon
          icon="grip-lines-vertical"
          prefix="fa"
          size="lg"
          color={COLOR.MEDIUM}
        />
      )}
      <FilePopup />
      <button onClick={handleSetPreview}>click</button>
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
      <CreateFileModal
        isOpen={isCreateFileModalOpen}
        onRequestClose={setIsCreateFileModalOpen.bind(null, false)}
      />
    </Style>
  )
}
