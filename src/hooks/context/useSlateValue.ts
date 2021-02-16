import { SlateValueContext } from '../../components/providers/SlateValueProvider/SlateValueProvider'
import { useNotNullableContext } from '../utils/useNotNullableContext'

export const useSlateValue = () => useNotNullableContext(SlateValueContext)
