import React, { RefObject, useState } from 'react'
import { Range } from 'slate'
import { useEditor } from 'slate-react'
import styled from 'styled-components'

import { Input } from '../../../../../atoms/Input/Input'
import { Modal } from '../../../../../atoms/Modal/Modal'
import { insertLink } from '../utils/commands/link/insertLink'

interface IHyperLinkModal {
  modalRef: RefObject<HTMLDivElement>
  selection: Range | null
  onClose: () => void
}

export function HyperLinkModal({
  modalRef,
  selection,
  onClose,
}: IHyperLinkModal) {
  const editor = useEditor()
  const [url, setUrl] = useState('')

  function handleOnSubmit() {
    if (!selection) return

    insertLink({ editor, selection, url })

    onClose()
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target

    setUrl(value)
  }

  return (
    <StyledModal modalRef={modalRef}>
      <h5>URL</h5>
      <Input
        value={url}
        clickOutsideCallback={() => null}
        handleOnChange={handleOnChange}
        type="text"
        onSubmit={handleOnSubmit}
        inputAriaLabel="insert hyperlink"
      />
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  width: 100%;
  max-width: 30ch;
  height: 100%;
  max-height: 20ch;
  padding: ${({ theme }) => theme.spacing.xs};
  background-color: var(--background-secondary);
`
