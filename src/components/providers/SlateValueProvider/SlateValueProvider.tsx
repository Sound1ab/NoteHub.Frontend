import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { Node } from 'slate'

interface IContextProps {
  slateValue: Node[]
  setSlateValue: Dispatch<SetStateAction<Node[]>>
}

export const SlateValueContext = React.createContext<Partial<IContextProps>>({})

interface ISlateValueProvider {
  children: ReactNode
}

export function SlateValueProvider({ children }: ISlateValueProvider) {
  const [slateValue, setSlateValue] = useState<Node[]>([])

  return (
    <SlateValueContext.Provider value={{ slateValue, setSlateValue }}>
      {children}
    </SlateValueContext.Provider>
  )
}
