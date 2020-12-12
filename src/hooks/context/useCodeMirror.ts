import { CodeMirrorContext } from '../../components/templates/Dashboard/Editor/MarkdownEditor/CodeMirror/CodeMirrorProvider'
import { useNotNullableContext } from '..'

export const useCodeMirror = () => useNotNullableContext(CodeMirrorContext)
