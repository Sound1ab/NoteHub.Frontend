import { FileTreeContext } from '../../components/templates/Dashboard/Sidebar/FileTree/FileTreeProvider'
import { useNotNullableContext } from '../utils/useNotNullableContext'

export const useFileTree = () => useNotNullableContext(FileTreeContext)
