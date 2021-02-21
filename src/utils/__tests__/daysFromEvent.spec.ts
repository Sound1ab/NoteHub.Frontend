import { daysFromEvent } from '../daysFromEvent'
import { mockDate } from '../mockDate'

describe('daysFromEvent', () => {
  mockDate('May 1, 2020 12:00:00')

  it('should return how many days are left until the event date as a negative value', () => {
    const eventDate = new Date('May 5, 2020 12:00:00').toDateString()

    const value = daysFromEvent(eventDate)

    expect(value).toEqual(-4)
  })

  it('should return positive values if the event date has passed', () => {
    const eventDate = new Date('April 28, 2020 12:00:00').toDateString()

    const value = daysFromEvent(eventDate)

    expect(value).toEqual(3)
  })

  it('should return null if no date is given', () => {
    const value = daysFromEvent(null)

    expect(value).toEqual(null)
  })
})
