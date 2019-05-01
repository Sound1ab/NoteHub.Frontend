import React from 'react'
import { useDeleteNote } from '../../../hooks'
import { Modal } from '../../atoms'

interface IDeleteNoteModal {
  isOpen: boolean
  onRequestClose: () => void
  activeNote: string | null
  activeNotebook: string | null
}

export function DeleteNoteModal({
  isOpen,
  onRequestClose,
  activeNote,
  activeNotebook,
}: IDeleteNoteModal) {
  const deleteNote = useDeleteNote(activeNotebook)

  async function handleDeleteNote() {
    if (!activeNote) {
      alert('No active note')
      return
    }
    await deleteNote({
      variables: {
        input: {
          id: activeNote,
        },
      },
    })
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
