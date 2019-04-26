import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faSoundcloud } from '@fortawesome/free-brands-svg-icons'
import {
  faComment,
  faEnvelope,
  faMoon,
  faPenSquare,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import React, { useReducer } from 'react'
import { GoogleFont, TypographyStyle } from 'react-typography'
import { useData } from '../hooks'
import { INotepad } from '../interfaces'
import { NoteContext } from '../store'
import { IState } from '../store'
import { initialState } from '../store'
import { notepadReducer, setAllNotepads, TNotepadActions } from '../store'
import { styled } from '../theme'
import { typography } from '../theme/typography'
import { Container, TextArea } from './atoms'
import { Sidebar } from './molecules'
import { CardList } from './organism'
import { GlobalStyle, ThemeProvider } from './utility'

library.add(
  faGithub as any,
  faSoundcloud as any,
  faEnvelope,
  faUser,
  faMoon,
  faComment,
  faPenSquare
)

const Style = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .app-page {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
  }

  .app-main {
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    min-width: 0;
    height: 100%;
    overflow-y: scroll;
  }
`

export function App() {
  const [data, loading] = useData<INotepad[]>()
  const [state, dispatch] = useReducer<React.Reducer<IState, TNotepadActions>>(
    notepadReducer,
    initialState
  )

  if (data.length > 0 && state.allNotepads.length === 0) {
    dispatch(setAllNotepads(data))
  }

  return (
    <ThemeProvider>
      <NoteContext.Provider value={[state, dispatch]}>
        <GlobalStyle />
        <TypographyStyle typography={typography} />
        <GoogleFont typography={typography} />
        {loading ? (
          'loading'
        ) : (
          <Style>
            <Container className="app-page">
              <Sidebar
                allNotepads={state.allNotepads}
                activeNotepad={state.activeNotepad}
                dispatch={dispatch}
              />
              <CardList
                activeNotepad={state.activeNotepad}
                activeNote={state.activeNote}
                dispatch={dispatch}
              />
              <main className="app-main">
                <TextArea
                  content={state.activeNote ? state.activeNote.content : null}
                />
              </main>
            </Container>
          </Style>
        )}
      </NoteContext.Provider>
    </ThemeProvider>
  )
}
