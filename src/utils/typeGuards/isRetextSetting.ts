import { Retext_Settings } from '../../components/apollo/generated_components_typings'

export function isRetextSetting(value: string): value is Retext_Settings {
  return Object.values(Retext_Settings).includes(value as Retext_Settings)
}
