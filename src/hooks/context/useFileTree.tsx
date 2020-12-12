import { FileTreeContext } from '../../components/templates/Dashboard/Sidebar/FileTree/FileTreeProvider'
import { useNotNullableContext } from '..'

export const useFileTree = () => useNotNullableContext(FileTreeContext)
