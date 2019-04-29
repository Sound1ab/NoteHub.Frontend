import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faSoundcloud } from '@fortawesome/free-brands-svg-icons'
import {
  faBook,
  faComment,
  faEnvelope,
  faMoon,
  faPenSquare,
  faPlusCircle,
  faSync,
  faTrash,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import React, { Dispatch, ReducerAction, useReducer } from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { GoogleFont, TypographyStyle } from 'react-typography'
import { useData } from '../hooks'
import { INotepad } from '../interfaces'
import { client } from '../services/Apollo/clientConfig'
import { notepadReducer, setAllNotepads, TNotepadActions } from '../store'
import { initialState } from '../store'
import { NoteContext, setActiveNote, setActiveNotepad } from '../store'
import { IState } from '../store'
import { typography } from '../theme/typography'
import { Editor } from './templates'
import { GlobalStyle, ThemeProvider } from './utility'

library.add(
  faGithub as any,
  faSoundcloud as any,
  faEnvelope,
  faUser,
  faMoon,
  faComment,
  faPenSquare,
  faBook,
  faPlusCircle,
  faSync,
  faTrash
)

function setupSelections(
  data: INotepad[],
  state: IState,
  dispatch: Dispatch<ReducerAction<React.Reducer<IState, TNotepadActions>>>
) {
  const dataAvailableNoNotepadsSet =
    data.length > 0 && state.allNotepads.length === 0

  const notepadsAvailableNoActiveNotepadSet =
    state.allNotepads.length > 0 && !state.activeNotepad

  const activeNotepadNoActiveNote =
    state.activeNotepad &&
    !state.activeNote &&
    state.activeNotepad.notes.length > 0

  if (dataAvailableNoNotepadsSet) {
    dispatch(setAllNotepads(data))
  }

  if (notepadsAvailableNoActiveNotepadSet) {
    dispatch(setActiveNotepad(state.allNotepads[0]))
  }

  if (activeNotepadNoActiveNote) {
    dispatch(setActiveNote(state.activeNotepad && state.activeNotepad.notes[0]))
  }
}

export function App() {
  const [data, loading] = useData<INotepad[]>()
  const [state, dispatch] = useReducer<React.Reducer<IState, TNotepadActions>>(
    notepadReducer,
    initialState
  )

  setupSelections(data, state, dispatch)

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <ThemeProvider>
          <NoteContext.Provider value={[state, dispatch]}>
            <GlobalStyle />
            <TypographyStyle typography={typography} />
            <GoogleFont typography={typography} />
            {loading ? 'loading' : <Editor />}
          </NoteContext.Provider>
        </ThemeProvider>
      </ApolloHooksProvider>
    </ApolloProvider>
  )
}
