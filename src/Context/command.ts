import { Dispatch, SetStateAction, createContext } from 'react'

import { IPosition } from '../hooks'

export interface ICommandContext {
  handleDeleteFile: () => void
  handleImageUpload: () => void
  handleSetEdit: () => void
  handleSetIsNewFileOpen: () => void
  loading: boolean
  setMarkdownCursorPosition: Dispatch<SetStateAction<IPosition>>
}

export const Command = createContext<ICommandContext | null>(null)

export const CommandProvider = Command.Provider
