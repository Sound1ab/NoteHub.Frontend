import { daysToEvent } from './daysToEvent'

export function daysFromEvent(date?: string | null) {
  const result = daysToEvent(date)

  if (result === null) {
    return null
  }

  const invertedResult = result * -1
  return invertedResult
}
