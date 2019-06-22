import React from 'react'
import { BulletList } from 'react-content-loader'
import { COLOR } from '../../../enums'
import { useStore } from '../../../hooks'
import { useListFiles } from '../../../hooks/file/useListFiles'
import { activeNote } from '../../../store'
import { styled } from '../../../theme'
import { Heading, Icon } from '../../atoms'

const Style = styled.div`
  line-height: 0;
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
  margin-left: ${({ theme }) => theme.spacing.s};

  .FileList-button {
    background-color: transparent;
  }
`

export function FileList() {
  const [state, dispatch] = useStore()
  const { files, loading } = useListFiles(
    state.user.username,
    state.notebook.activeNotebook
  )

  function handleCardClick(note: string | null) {
    if (dispatch) dispatch(activeNote(note))
  }

  return (
    <>
      {loading ? (
        <BulletList />
      ) : (
        files
          .sort((noteA, noteB) => {
            return noteA.filename.localeCompare(noteB.filename)
          })
          .map(note => {
            const isActive =
              state.notebook.activeNote &&
              note &&
              note.filename === state.notebook.activeNote

            return (
              <Style>
                <button className="FileList-button">
                  <Heading
                    key={note.sha}
                    color={isActive ? COLOR.ACTIVE : COLOR.DARK}
                    onClick={handleCardClick.bind(null, note.filename)}
                    type="h6"
                  >
                    {note.filename}
                  </Heading>
                </button>
              </Style>
            )
          })
      )}
    </>
  )
}
