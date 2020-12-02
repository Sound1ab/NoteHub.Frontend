import { useContext } from 'react'

import { CodeMirrorContext } from '../../components/providers'

export const useCodeMirror = () => useContext(CodeMirrorContext)
