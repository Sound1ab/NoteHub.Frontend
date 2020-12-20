import { Retext_Settings } from '../../components/apollo'
import { debounce } from '../../utils'
import Worker from '../worker'

const instance = new Worker()

export const process = debounce(
  async (value: string, retextSettings: Retext_Settings[]) => {
    return instance.processData(value, retextSettings)
  },
  500
)
