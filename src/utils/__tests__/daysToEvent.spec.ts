import { daysToEvent } from '../daysToEvent'
import { mockDate } from '../mockDate'

describe('daysToEvent', () => {
  mockDate('May 1, 2020 12:00:00')

  it('should return how many days are left until the event date', () => {
    const eventDate = new Date('May 5, 2020 12:00:00').toDateString()

    const value = daysToEvent(eventDate)

    expect(value).toEqual(4)
  })

  it('should return negative values if the event date has passed', () => {
    const eventDate = new Date('April 28, 2020 12:00:00').toDateString()

    const value = daysToEvent(eventDate)

    expect(value).toEqual(-3)
  })

  it('should return null if no date is given', () => {
    const value = daysToEvent(null)

    expect(value).toEqual(null)
  })
})
