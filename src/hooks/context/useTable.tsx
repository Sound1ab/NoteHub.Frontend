import { TableContext } from '../../components/atoms/Table/Table'
import { useNotNullableContext } from '../utils/useNotNullableContext'

export const useTable = () => useNotNullableContext(TableContext)
