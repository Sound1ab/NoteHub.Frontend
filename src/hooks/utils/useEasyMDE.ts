import { useContext } from 'react'

import { EasyMDEContext } from '../../components/providers'

export const useEasyMDE = () => useContext(EasyMDEContext)
