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
  faTimes,
  faTrash,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import React, { useReducer } from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { GoogleFont, TypographyStyle } from 'react-typography'
import { client } from '../services/Apollo/clientConfig'
import { notebookReducer, TNotebookActions } from '../store'
import { initialState } from '../store'
import { NoteContext } from '../store'
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
  faTrash,
  faTimes
)

export function App() {
  const [state, dispatch] = useReducer<React.Reducer<IState, TNotebookActions>>(
    notebookReducer,
    initialState
  )

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <ThemeProvider>
          <NoteContext.Provider value={[state, dispatch]}>
            <GlobalStyle />
            <TypographyStyle typography={typography} />
            <GoogleFont typography={typography} />
            <Editor />
          </NoteContext.Provider>
        </ThemeProvider>
      </ApolloHooksProvider>
    </ApolloProvider>
  )
}
