import { darken as polishedDarken } from 'polished'

import { getCssVariable } from './getCssVariable'

export function darken(variable: string, amount: number) {
  const value = getCssVariable(variable)

  return polishedDarken(amount, value)
}
