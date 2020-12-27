import { CodeMirrorContext } from '../../components/templates/Dashboard/Editor/MarkdownEditor/CodeMirror/CodeMirrorProvider'
import { useNotNullableContext } from '../utils/useNotNullableContext'

export const useCodeMirror = () => useNotNullableContext(CodeMirrorContext)
