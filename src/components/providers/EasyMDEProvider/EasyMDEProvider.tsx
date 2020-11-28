import CodeMirror from 'codemirror'
import EasyMDE from 'easymde'
import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react'

interface IEasyMDEProvider {
  children?: ReactNode
}

type ContextProps = {
  editor: EasyMDE
  setEasyMDE: Dispatch<SetStateAction<EasyMDE | undefined>>
  codemirror: CodeMirror.Editor
  easyMDE: typeof EasyMDE
}

export const EasyMDEContext = React.createContext<Partial<ContextProps>>({})

export function EasyMDEProvider({ children }: IEasyMDEProvider) {
  const [easyMDE, setEasyMDE] = useState<EasyMDE | undefined>(undefined)

  const EasyMDEConstructor = easyMDE?.constructor as typeof EasyMDE

  return (
    <EasyMDEContext.Provider
      value={{
        editor: easyMDE,
        setEasyMDE,
        codemirror: easyMDE?.codemirror,
        easyMDE: EasyMDEConstructor,
      }}
    >
      {children}
    </EasyMDEContext.Provider>
  )
}
