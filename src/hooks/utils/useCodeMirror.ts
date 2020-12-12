import { useContext } from 'react'

import { CodeMirrorContext } from '../../components/templates/Dashboard/Editor/MarkdownEditor/CodeMirror/CodeMirrorProvider'

export const useCodeMirror = () => useContext(CodeMirrorContext)
