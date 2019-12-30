import { Dispatch, SetStateAction, createContext } from 'react'

import { IPosition } from '../hooks'

export interface ICommandContext {
  handleDeleteFile: () => void
  handleImageUpload: () => void
  handleSetEdit: () => void
  handleSetIsNewFileOpen: () => void
  loading: boolean
  setMarkdownCursorPosition: Dispatch<SetStateAction<IPosition>>
  handleSetFileContent: (newValue: string) => void
  fileContent: string
  filePath?: string | null
}

export const Command = createContext<ICommandContext | null>(null)

export const CommandProvider = Command.Provider
