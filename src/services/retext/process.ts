import { Retext_Settings } from '../../components/apollo/generated_components_typings'
import { debounce } from '../../utils/debounce'
import { processData } from '../worker/retext.worker'

export const process = debounce(
  async (value: string, retextSettings: Retext_Settings[]) => {
    return processData(value, retextSettings)
  },
  500
)
