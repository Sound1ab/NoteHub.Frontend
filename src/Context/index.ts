import React from 'react'
import { INotepad } from '../interfaces'

export const NoteContext = React.createContext<INotepad[] | null>(null)