import React, { useReducer } from 'react'
import { GoogleFont, TypographyStyle } from 'react-typography'
import {useData} from '../hooks'
import { INotepad } from '../interfaces'
import {NoteContext} from '../store'
import {IState} from '../store'
import {initialState} from '../store'
import {TNotepadActions} from '../store/actions/notepadAction'
import {setAllNotepads} from '../store/actions/notepadAction'
import {notepadReducer} from '../store/reducers/notepadReducer'
import { typography } from '../theme/typography'
import {IIndex} from './templates'
import { GlobalStyle, ThemeProvider } from './utility'

export function App() {
  const [data, loading] = useData<INotepad[]>()
  const [state, dispatch] = useReducer<React.Reducer<IState, TNotepadActions>>(notepadReducer, initialState)

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
          <IIndex />
        )}
      </NoteContext.Provider>
    </ThemeProvider>
  )
}
