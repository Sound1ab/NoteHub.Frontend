import { useReactiveVar } from '@apollo/client'
import CodeMirror from 'codemirror'
import EasyMDE from 'easymde'
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'

import { localState } from '../ApolloProvider/cache'

interface IEasyMDEProvider {
  children?: ReactNode
}

type ContextProps = {
  editor: EasyMDE
  setEasyMDE: Dispatch<SetStateAction<EasyMDE | undefined>>
  codemirror: CodeMirror.Editor
  easyMDE: typeof EasyMDE
  toggleSideBySide: () => void
  togglePreview: () => void
  isSideBySideActive: boolean
  isPreviewActive: boolean
}

export const EasyMDEContext = React.createContext<Partial<ContextProps>>({})

export function EasyMDEProvider({ children }: IEasyMDEProvider) {
  const [easyMDE, setEasyMDE] = useState<EasyMDE | undefined>(undefined)
  const isSideBySideActive = useReactiveVar(localState.isSideBySideActiveVar)
  const isPreviewActive = useReactiveVar(localState.isPreviewActiveVar)
  const EasyMDEConstructor = easyMDE?.constructor as typeof EasyMDE

  function ignoreErrorFromFn(fn: () => void) {
    try {
      fn()
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    if (!easyMDE) {
      return
    }

    if (isSideBySideActive && !easyMDE.isSideBySideActive()) {
      ignoreErrorFromFn(() => EasyMDEConstructor?.toggleSideBySide(easyMDE))
    } else if (!isSideBySideActive && easyMDE.isSideBySideActive()) {
      ignoreErrorFromFn(() => EasyMDEConstructor?.toggleSideBySide(easyMDE))
    }
    if (isPreviewActive && !easyMDE?.isPreviewActive()) {
      ignoreErrorFromFn(() => EasyMDEConstructor?.togglePreview(easyMDE))
    } else if (!isPreviewActive && easyMDE?.isPreviewActive()) {
      ignoreErrorFromFn(() => EasyMDEConstructor?.togglePreview(easyMDE))
    }
  }, [EasyMDEConstructor, isSideBySideActive, isPreviewActive, easyMDE])

  function toggleSideBySide() {
    if (!isSideBySideActive) {
      localState.isPreviewActiveVar(false)
    }
    localState.isSideBySideActiveVar(!isSideBySideActive)
  }

  function togglePreview() {
    if (!isPreviewActive) {
      localState.isSideBySideActiveVar(false)
    }
    localState.isPreviewActiveVar(!isPreviewActive)
  }

  return (
    <EasyMDEContext.Provider
      value={{
        editor: easyMDE,
        setEasyMDE,
        codemirror: easyMDE?.codemirror,
        easyMDE: EasyMDEConstructor,
        toggleSideBySide,
        togglePreview,
        isPreviewActive,
        isSideBySideActive,
      }}
    >
      {children}
    </EasyMDEContext.Provider>
  )
}
