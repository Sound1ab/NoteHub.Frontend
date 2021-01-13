import { CodeMirrorContext } from '../../components/templates/Dashboard/CodeMirror/CodeMirror'
import { useNotNullableContext } from '../utils/useNotNullableContext'

export const useEditor = () => useNotNullableContext(CodeMirrorContext)
