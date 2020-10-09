import EasyMDE from 'easymde'
import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react'

interface IEasyMDEProvider {
  children?: ReactNode
}

type ContextProps = {
  EasyMDE: typeof EasyMDE
  editor: EasyMDE
  setEasyMDE: Dispatch<SetStateAction<EasyMDE | undefined>>
}

export const EasyMDEContext = React.createContext<Partial<ContextProps>>({})

export function EasyMDEProvider({ children }: IEasyMDEProvider) {
  const [easyMDE, setEasyMDE] = useState<EasyMDE | undefined>(undefined)

  return (
    <EasyMDEContext.Provider
      value={{
        EasyMDE: easyMDE?.constructor as typeof EasyMDE,
        editor: easyMDE,
        setEasyMDE,
      }}
    >
      {children}
    </EasyMDEContext.Provider>
  )
}
