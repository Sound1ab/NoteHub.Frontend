const MS_PER_DAY = 1000 * 60 * 60 * 24

export function daysToEvent(date?: string | null) {
  if (!date) {
    return null
  }

  const now = new Date()
  const event = new Date(date)
  const nowUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  const eventUTC = Date.UTC(
    event.getFullYear(),
    event.getMonth(),
    event.getDate()
  )

  return Math.floor((eventUTC - nowUTC) / MS_PER_DAY)
}
