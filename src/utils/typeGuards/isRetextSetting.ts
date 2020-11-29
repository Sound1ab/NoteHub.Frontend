import { Retext_Settings } from '../../components/apollo'

export function isRetextSetting(value: string): value is Retext_Settings {
  return Object.values(Retext_Settings).includes(value as Retext_Settings)
}
