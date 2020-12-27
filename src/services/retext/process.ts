import { Retext_Settings } from '../../components/apollo/generated_components_typings'
import { debounce } from '../../utils/debounce'
import Worker from '../worker'

const instance = new Worker()

export const process = debounce(
  async (value: string, retextSettings: Retext_Settings[]) => {
    return instance.processData(value, retextSettings)
  },
  500
)
