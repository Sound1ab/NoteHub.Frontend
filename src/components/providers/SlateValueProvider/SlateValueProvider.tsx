import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { Descendant } from 'slate'

import { CustomElement } from '../../templates/Dashboard/Editor/Slate/SlateTypes'

interface IContextProps {
  slateValue: Descendant[]
  setSlateValue: Dispatch<SetStateAction<Descendant[]>>
}

export const SlateValueContext = React.createContext<Partial<IContextProps>>({})

interface ISlateValueProvider {
  children: ReactNode
}

export function SlateValueProvider({ children }: ISlateValueProvider) {
  const initialValue: CustomElement[] = []
  const [slateValue, setSlateValue] = useState<Descendant[]>(initialValue)

  return (
    <SlateValueContext.Provider value={{ slateValue, setSlateValue }}>
      {children}
    </SlateValueContext.Provider>
  )
}
