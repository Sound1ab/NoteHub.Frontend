export const DateType = {
  dayOfWeek(parentValue: string): string {
    const jsDate = new Date(parentValue)
    const splitDate = jsDate.toDateString().split(' ')

    return splitDate[0]
  },
  dayOfMonth(parentValue: string): number {
    const jsDate = new Date(parentValue)
    const splitDate = jsDate.toDateString().split(' ')

    return Number(splitDate[2])
  },
  month(parentValue: string): string {
    const jsDate = new Date(parentValue)
    const splitDate = jsDate.toDateString().split(' ')

    return splitDate[1]
  },
  dateLongForm(parentValue: string): string {
    return new Date(parentValue).toISOString()
  },
}
