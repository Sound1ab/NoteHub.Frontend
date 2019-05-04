import React from 'react'
import { useStore } from '../../../hooks'
import { useDeleteFile } from '../../../hooks/file/useDeleteFile'
import { resetNotebook } from '../../../store'
import { Modal } from '../../atoms'

interface IDeleteNoteModal {
  isOpen: boolean
  onRequestClose: () => void
}

export function DeleteNoteModal({ isOpen, onRequestClose }: IDeleteNoteModal) {
  const [state, dispatch] = useStore()
  const deleteFile = useDeleteFile(
    state.user.username,
    state.notebook.activeNotebook
  )

  async function handleDeleteNote() {
    if (!state.notebook.activeNote) {
      return
    }
    await deleteFile({
      variables: {
        input: {
          filename: state.notebook.activeNote,
          repo: state.notebook.activeNotebook,
          username: state.user.username,
        },
      },
    })
    dispatch(resetNotebook({ note: true }))
    onRequestClose()
  }

  return (
    <Modal
      onContinue={handleDeleteNote}
      title="Delete Note"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <span>Please confirm you wish to delete a note.</span>
    </Modal>
  )
}
