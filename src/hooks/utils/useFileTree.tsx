import { useContext } from 'react'
import { FileTreeContext } from '../../components/templates/Dashboard/Sidebar/FileTree/FileTreeProvider'

export const useFileTree = () => useContext(FileTreeContext)
