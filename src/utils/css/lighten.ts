import { lighten as polishedLighten } from 'polished'

import { getCssVariable } from './getCssVariable'

export function lighten(variable: string, amount: number) {
  const value = getCssVariable(variable)

  return polishedLighten(amount, value)
}
